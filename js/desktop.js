// Desktop Environment Controller
class Desktop {
    constructor() {
        this.startMenuOpen = false;
        this.init();
    }

    init() {
        this.setupTaskbar();
        this.setupDesktopIcons();
        this.setupStartMenu();
        this.updateClock();
        this.setupDesktopClickHandler();
    }

    setupTaskbar() {
        const startButton = document.getElementById('start-button');
        const startMenu = document.getElementById('start-menu');

        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleStartMenu();
        });

        // Start clock
        setInterval(() => this.updateClock(), 1000);
    }

    setupDesktopIcons() {
        const desktopIcons = document.querySelectorAll('.desktop-icon');
        
        desktopIcons.forEach(icon => {
            icon.addEventListener('dblclick', () => {
                const app = icon.getAttribute('data-app');
                this.openApplication(app);
            });

            // Add selection effect
            icon.addEventListener('click', () => {
                this.selectDesktopIcon(icon);
            });
        });
    }

    setupStartMenu() {
        const startMenu = document.getElementById('start-menu');
        const menuItems = startMenu.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const app = item.getAttribute('data-app');
                if (app) {
                    this.openApplication(app);
                }
                this.closeStartMenu();
            });
        });
    }

    setupDesktopClickHandler() {
        const desktop = document.getElementById('desktop');
        desktop.addEventListener('click', (e) => {
            // Close start menu when clicking elsewhere
            if (!e.target.closest('#start-button') && !e.target.closest('#start-menu')) {
                this.closeStartMenu();
            }
            
            // Deselect desktop icons
            if (e.target === desktop || e.target.closest('.desktop') === desktop) {
                this.deselectAllDesktopIcons();
            }
        });
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        const startButton = document.getElementById('start-button');
        
        if (this.startMenuOpen) {
            this.closeStartMenu();
        } else {
            this.openStartMenu();
        }
    }

    openStartMenu() {
        const startMenu = document.getElementById('start-menu');
        const startButton = document.getElementById('start-button');
        
        startMenu.classList.remove('hidden');
        startButton.classList.add('win-95-button-pressed');
        this.startMenuOpen = true;
    }

    closeStartMenu() {
        const startMenu = document.getElementById('start-menu');
        const startButton = document.getElementById('start-button');
        
        startMenu.classList.add('hidden');
        startButton.classList.remove('win-95-button-pressed');
        this.startMenuOpen = false;
    }

    selectDesktopIcon(icon) {
        this.deselectAllDesktopIcons();
        icon.classList.add('selected');
    }

    deselectAllDesktopIcons() {
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => icon.classList.remove('selected'));
    }

    openApplication(appName) {
        // Delegate to window manager
        if (window.WindowManager) {
            window.WindowManager.openWindow(appName);
        }
    }

    updateClock() {
        const clock = document.getElementById('clock');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        clock.textContent = `${hours}:${minutes}`;
    }

    addTaskbarButton(windowId, title, icon) {
        const taskbarPrograms = document.getElementById('taskbar-programs');
        const button = document.createElement('button');
        button.className = 'win-95-button text-xs px-2 h-8 flex items-center gap-1 max-w-32 truncate';
        button.setAttribute('data-window', windowId);
        button.innerHTML = `
            <span class="text-xs">${icon}</span>
            <span class="truncate">${title}</span>
        `;
        
        button.addEventListener('click', () => {
            if (window.WindowManager) {
                window.WindowManager.toggleWindow(windowId);
            }
        });
        
        taskbarPrograms.appendChild(button);
        return button;
    }

    removeTaskbarButton(windowId) {
        const button = document.querySelector(`[data-window="${windowId}"]`);
        if (button) {
            button.remove();
        }
    }

    setTaskbarButtonActive(windowId, active) {
        const button = document.querySelector(`[data-window="${windowId}"]`);
        if (button) {
            if (active) {
                button.classList.add('win-95-button-pressed');
            } else {
                button.classList.remove('win-95-button-pressed');
            }
        }
    }
}

// Initialize desktop when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.Desktop = new Desktop();
}); 