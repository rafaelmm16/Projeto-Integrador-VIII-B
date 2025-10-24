# ♻️ Recicla Capixaba - Jogos Educativos

Plataforma de jogos educativos sobre reciclagem e sustentabilidade, baseada no programa Recicla Capixaba.

## 🎮 Jogos Disponíveis

### 1. 🗑️ Separe os Resíduos
Jogo de classificação onde o jogador deve separar corretamente diferentes materiais recicláveis:
- Metais (alumínio, sucata ferrosa)
- Plásticos (garrafas PET, sacolas, tampinhas)
- Cerâmicas
- Pneus
- Isopor

**Recursos:**
- Sistema de vidas (3 vidas)
- Cronômetro
- 15 itens para classificar
- Salvamento de pontuação no ranking

### 2. 🧠 Quiz de Reciclagem
10 perguntas educativas sobre reciclagem com explicações detalhadas:
- Cores das lixeiras
- Tríplice lavagem de embalagens
- Importância da separação de tampinhas
- Reciclagem de alumínio
- Destino correto de cada material

**Recursos:**
- Feedback imediato
- Explicações educativas
- Sistema de pontuação
- Ranking de melhores jogadores

### 3. 🧩 Memória Ecológica
Jogo da memória com 8 pares de materiais recicláveis:
- Alumínio
- Plástico
- Pneu
- Cerâmica
- Isopor
- Metal
- Tampinha
- Sacola

**Recursos:**
- Contador de movimentos
- Cronômetro
- Pontuação baseada em performance
- Sistema de ranking

## 🚀 Estrutura Preparada para Next.js

O projeto está estruturado no diretório `/app` seguindo o padrão do Next.js App Router. Para converter completamente, veja [NEXTJS_SETUP.md](./NEXTJS_SETUP.md).

## ⚙️ Configuração

### Variáveis de Ambiente

O projeto usa Supabase. As variáveis já estão configuradas em `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
````

## 🏃 Como Executar

### Modo Atual (Vite)

```bash
npm install
npm run dev
```

Acesse: http://localhost:5173

### Para Converter para Next.js

1.  Instale o Next.js: `npm install next`
2.  Atualize os scripts no package.json (veja NEXTJS\_SETUP.md)
3.  Execute: `npm run dev`
4.  Acesse: http://localhost:3000

## 📦 Build para Produção

### Vite (atual)

```bash
npm run build
npm run preview
```

### Next.js (após conversão)

```bash
npm run build
npm start
```

## 🌿 Materiais Recicláveis

O projeto ensina sobre a separação correta de:

✅ Embalagens de alumínio e metais ferrosos
✅ Plásticos (garrafas PET, sacolas)
✅ Tampinhas plásticas e lacres
✅ Pneus
✅ Cerâmicas
✅ Isopor
✅ Embalagens de agrotóxicos (após tríplice lavagem)

## ✨ Funcionalidades

  - ✅ Interface intuitiva e responsiva
  - ✅ Salvamento automático de pontuações
  - ✅ Rankings por jogo
  - ✅ Feedback educativo
  - ✅ Design sustentável com tema verde
  - ✅ Preparado para Next.js
  - ✅ Integração completa com Supabase
  - ✅ Row Level Security configurado

## 🤝 Contribuindo

Este é um projeto educativo sobre sustentabilidade. Sugestões são bem-vindas\!
