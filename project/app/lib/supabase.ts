import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Player {
  id: string
  name: string
  email?: string
  created_at: string
}

export interface GameScore {
  id: string
  player_id: string
  game_type: string
  score: number
  time_taken?: number
  completed: boolean
  created_at: string
}

export async function createPlayer(name: string, email?: string): Promise<Player | null> {
  const { data, error } = await supabase
    .from('players')
    .insert({ name, email })
    .select()
    .maybeSingle()

  if (error) {
    console.error('Error creating player:', error)
    return null
  }

  return data
}

export async function saveGameScore(
  playerName: string,
  gameType: string,
  score: number,
  timeTaken?: number,
  completed: boolean = true
): Promise<boolean> {
  const player = await supabase
    .from('players')
    .select()
    .eq('name', playerName)
    .maybeSingle()

  if (!player.data) {
    const newPlayer = await createPlayer(playerName)
    if (!newPlayer) return false
    player.data = newPlayer
  }

  const { error } = await supabase
    .from('game_scores')
    .insert({
      player_id: player.data.id,
      game_type: gameType,
      score,
      time_taken: timeTaken,
      completed,
    })

  if (error) {
    console.error('Error saving score:', error)
    return false
  }

  return true
}

export async function getLeaderboard(gameType: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('game_scores')
    .select('*, players(name)')
    .eq('game_type', gameType)
    .eq('completed', true)
    .order('score', { ascending: false })
    .limit(limit)

  if (error) {
    // Narrow unknown error and log safely
    const e = error as unknown
    let details: Record<string, unknown> = { raw: e }
    if (typeof e === 'object' && e !== null) {
      const eo = e as Record<string, unknown>
      details = {
        message: String(eo.message ?? null),
        details: eo.details ?? null,
        hint: eo.hint ?? null,
        code: eo.code ?? null,
        status: eo.status ?? null,
        raw: eo,
      }
    }
    console.error('Error fetching leaderboard:', details)
    return []
  }

  return data
}
