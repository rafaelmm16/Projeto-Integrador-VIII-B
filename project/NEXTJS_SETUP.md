# Como Converter para Next.js

Este projeto foi preparado com uma estrutura Next.js no diretório `/app`, mas está atualmente rodando com Vite.

## Para converter completamente para Next.js:

### 1. Instalar Next.js
```bash
npm install next@latest
```

### 2. Atualizar package.json scripts
Substitua os scripts por:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 3. Usar as variáveis de ambiente
O arquivo `.env.local` já está configurado com as variáveis do Supabase usando o prefixo `NEXT_PUBLIC_`.

### 4. Estrutura do Projeto

A estrutura já está preparada:
```
/app
  /games
    - RecyclingSorting.tsx
    - RecyclingQuiz.tsx
    - RecyclingMemory.tsx
  /lib
    - supabase.ts
  - layout.tsx
  - page.tsx
  - globals.css
```

### 5. Arquivos Configurados

- ✅ `app/layout.tsx` - Layout raiz com metadata
- ✅ `app/page.tsx` - Página principal (Client Component)
- ✅ `app/globals.css` - Estilos globais
- ✅ `app/lib/supabase.ts` - Cliente Supabase
- ✅ `app/games/*.tsx` - Todos os jogos como Client Components
- ✅ `.env.local` - Variáveis de ambiente
- ✅ `next.config.js` - Configuração do Next.js
- ✅ `tailwind.config.js` - Já configurado
- ✅ `postcss.config.js` - Já configurado

### 6. Iniciar o Servidor

Após instalar o Next.js:
```bash
npm run dev
```

O servidor estará disponível em http://localhost:3000

## Estrutura Atual (Vite)

O projeto atual usa Vite e está totalmente funcional. Para executá-lo:
```bash
npm run dev
```

## Migração dos Jogos

Todos os jogos já estão no formato correto:
- Marcados com `'use client'` no topo
- Importações atualizadas para o diretório `app/`
- Hooks do React funcionando corretamente
- Integração com Supabase funcionando

## Banco de Dados

O Supabase já está configurado com:
- Tabela `players` para armazenar jogadores
- Tabela `game_scores` para armazenar pontuações
- Row Level Security (RLS) ativado
- Políticas de acesso públicas para jogos educativos
