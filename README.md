# ⚜️ Painel de Escuteiros

Painel de controlo para gestão de membros e finanças de agrupamentos de escuteiros.

## 🚀 Como publicar no GitHub Pages

### 1. Criar o repositório no GitHub
- Vai a [github.com](https://github.com) → **New repository**
- Nome: `painel-escuteiros` (tem de coincidir com o `base` no `vite.config.js`)
- Deixa **público** (necessário para GitHub Pages gratuito)
- Clica em **Create repository**

### 2. Fazer upload dos ficheiros
Na pasta do projeto, corre no terminal:

```bash
git init
git add .
git commit -m "Primeiro commit - Painel de Escuteiros"
git branch -M main
git remote add origin https://github.com/SEU_UTILIZADOR/painel-escuteiros.git
git push -u origin main
```

> Substitui `SEU_UTILIZADOR` pelo teu nome de utilizador do GitHub.

### 3. Ativar o GitHub Pages
- No repositório → **Settings** → **Pages**
- Em **Source**, seleciona **GitHub Actions**
- Guarda

### 4. Deploy automático ✅
A partir de agora, sempre que fizeres `git push`, o site atualiza automaticamente!

O teu painel fica disponível em:
```
https://SEU_UTILIZADOR.github.io/painel-escuteiros/
```

---

## 💻 Desenvolvimento local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) no browser.

## 🏗️ Build para produção

```bash
npm run build
```

## ⚙️ Configuração

Se mudares o nome do repositório no GitHub, atualiza o ficheiro `vite.config.js`:

```js
base: '/NOME_DO_REPOSITORIO/',
```

---

**Sempre Alerta!** ⚜️
