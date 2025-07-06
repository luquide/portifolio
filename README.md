# 🖥️ Windows 95 Desktop Portfolio

Um ambiente desktop completo do Windows 95 onde seu portfólio é uma das aplicações disponíveis. Experiência nostálgica autêntica dos anos 90!

## 🎨 Características

- **Desktop Completo**: Ambiente Windows 95 autêntico com ícones, taskbar e Start Menu
- **Multi-janelas**: Sistema de gerenciamento de janelas com minimizar/maximizar/fechar
- **Portfólio Integrado**: Seu portfólio como uma aplicação do sistema
- **Aplicações Funcionais**: My Computer, Games, Notepad, Internet Explorer, Recycle Bin
- **Interativo**: Arraste janelas, clique em ícones, use o Start Menu
- **Totalmente Responsivo**: Escala automaticamente de 1024px até 4K+ com breakpoints inteligentes

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos personalizados + Tailwind CSS
- **JavaScript**: Funcionalidades interativas
- **Chart.js**: Gráficos de habilidades
- **GitHub Pages**: Hospedagem gratuita

## 🚀 Como Usar

### Deployment no GitHub Pages

1. **Fork este repositório**
2. **Vá para Settings > Pages**
3. **Configure Source**: Deploy from a branch
4. **Selecione**: Branch `main` / `(root)`
5. **Aguarde o deploy** (geralmente leva alguns minutos)

### Personalização

1. **Edite suas informações**:
   - `index.html`: Altere nome, projetos e links
   - `css/style.css`: Personalize cores e estilos
   - `js/script.js`: Modifique funcionalidades

2. **Substitua os placeholders**:
   - Email: `contato@seudominio.com`
   - LinkedIn: `https://linkedin.com/in/seuusuario`
   - GitHub: `https://github.com/seuusuario`
   - Links dos projetos nos `data-link`

3. **Adicione suas próprias imagens**:
   - Crie a pasta `images/` se necessário
   - Substitua os placeholders por suas imagens

## 🖱️ Como Usar o Desktop

### Interações Básicas
- **Duplo-clique** nos ícones do desktop para abrir aplicações
- **Clique único** para selecionar ícones
- **Clique no Start** para abrir o menu de aplicações
- **Arraste** janelas pela barra de título
- **Clique nos botões** da janela para minimizar (_), maximizar (□) ou fechar (✕)

### Aplicações Disponíveis
- **📁 Portfolio**: Seu portfólio completo com projetos e contato
- **🖥️ My Computer**: Explorador de sistema nostálgico
- **🎮 Games**: Lista de jogos clássicos do Windows
- **📝 Notepad**: Editor de texto funcional
- **🌐 Internet Explorer**: Navegador retrô (meramente decorativo)
- **🗑️ Recycle Bin**: Lixeira do sistema (vazia)

## 📐 Sistema Responsivo Inteligente

O desktop se adapta automaticamente ao tamanho da tela:

### 📏 Breakpoints e Escalas
- **< 1200px**: Base - Tablets e laptops pequenos
- **1200px - 1599px**: Médio - Desktops padrão (incluindo 1920x1080)
- **1600px - 1999px**: Grande - Monitores grandes
- **2000px+**: Extra grande - 4K e ultrawide

### 🎯 Elementos Responsivos
- **Ícones do desktop**: Escalam de 40px a 80px baseado na viewport
- **Janelas**: Tamanho mínimo e máximo adaptativos
- **Taskbar**: Altura responsiva (35px a 55px)
- **Fontes**: Usam clamp() para escalar suavemente
- **Espaçamentos**: Todos os elementos usam unidades viewport (vw/vh)
- **Textos dos ícones**: Quebra de linha inteligente e espaçamento otimizado
- **Layout flexível**: Ícones organizados em flexbox para evitar sobreposições

### 📱 Mobile-First
- **Tablets**: Layout adaptado com ícones reorganizados
- **Mobile**: Efeito CRT desabilitado, windows em tela cheia

### 🔧 Correções Técnicas
- **Taskbar fixa**: Posicionamento absoluto para evitar problemas em resoluções específicas
- **Sem transform scaling**: Removido scaling do body para melhor compatibilidade
- **Viewport otimizado**: Usa clamp() para escalonamento suave em todas as resoluções

## 📁 Estrutura do Projeto

```
port/
├── index.html          # Desktop environment principal
├── css/
│   └── style.css      # Estilos do sistema Windows 95
├── js/
│   ├── desktop.js     # Controlador do desktop (taskbar, ícones, Start Menu)
│   ├── windows.js     # Sistema de gerenciamento de janelas
│   └── portfolio.js   # Aplicação do portfólio
├── images/            # Imagens do projeto (opcional)
└── README.md          # Este arquivo
```

## 🎯 Funcionalidades do Desktop

- **Sistema de Janelas**: Abrir, fechar, minimizar, maximizar e arrastar janelas
- **Desktop Icons**: Ícones clicáveis com seleção e duplo-clique
- **Taskbar Completa**: Start Menu, botões de aplicações ativas e relógio
- **Aplicações Múltiplas**: Portfolio, My Computer, Games, Notepad, Internet Explorer
- **Portfolio Integrado**: Navegação SPA, gráficos de habilidades, guestbook
- **Efeito CRT**: Filtro retrô autêntico nas janelas

## 🔧 Personalização Avançada

### Cores do Tema

As cores principais estão definidas no `css/style.css`:

```css
/* Cores principais */
body { background-color: #000080; }        /* Azul do desktop */
.win-95-border { border-color: #ffffff #808080 #808080 #ffffff; }
.win-95-button { background-color: #c0c0c0; }
```

### Adicionando Novos Projetos

No `index.html`, adicione um novo item na seção de projetos:

```html
<div class="project-item text-center cursor-pointer" 
     data-title="Seu Projeto" 
     data-desc="Descrição do projeto" 
     data-tech="Tecnologias usadas" 
     data-img="URL da imagem"
     data-link="https://github.com/seu-projeto">
    <div class="w-20 h-20 mx-auto win-95-border flex items-center justify-center bg-green-600 text-white font-bold">
        🚀
    </div>
    <p class="mt-2">Seu_Projeto.exe</p>
</div>
```

## 📱 Responsividade

O site é otimizado para:
- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Navegação adaptada
- **Mobile**: Interface compacta e touch-friendly

## 🌐 Browser Support

- Chrome/Chromium (recomendado)
- Firefox
- Safari
- Edge

## 📜 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

## 📞 Contato

- **Email**: contato@seudominio.com
- **LinkedIn**: [linkedin.com/in/seuusuario](https://linkedin.com/in/seuusuario)
- **GitHub**: [github.com/seuusuario](https://github.com/seuusuario)

---

*Feito com ❤️ e muita nostalgia dos anos 90!* 🖥️✨ 