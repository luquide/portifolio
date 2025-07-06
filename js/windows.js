// Window Management System
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.zIndexCounter = 100;
        this.activeWindow = null;
        this.init();
    }

    init() {
        this.setupWindowContainer();
        this.setupWindowTemplates();
    }

    setupWindowContainer() {
        this.container = document.getElementById('windows-container');
        
        // Handle clicks on windows container to manage z-index
        this.container.addEventListener('mousedown', (e) => {
            const window = e.target.closest('.window');
            if (window) {
                this.bringToFront(window);
            }
        });
    }

    setupWindowTemplates() {
        // Window templates are already defined in HTML
        // This method can be used to register custom templates
    }

    openWindow(appName) {
        // Check if window is already open
        if (this.windows.has(appName)) {
            const existingWindow = this.windows.get(appName);
            this.showWindow(existingWindow.element);
            this.bringToFront(existingWindow.element);
            return;
        }

        // Create new window
        const windowElement = this.createWindow(appName);
        if (windowElement) {
            this.registerWindow(appName, windowElement);
            this.showWindow(windowElement);
            this.bringToFront(windowElement);
        }
    }

    createWindow(appName) {
        const template = document.getElementById(`${appName}-window-template`);
        if (!template) {
            console.warn(`No template found for ${appName}`);
            return null;
        }

        const windowElement = template.content.cloneNode(true).querySelector('.window');
        const windowId = `window-${appName}-${Date.now()}`;
        
        windowElement.id = windowId;
        windowElement.style.position = 'absolute';
        windowElement.style.left = '50px';
        windowElement.style.top = '50px';
        windowElement.style.zIndex = this.zIndexCounter++;

        // Setup window controls
        this.setupWindowControls(windowElement);
        
        // Make window draggable
        this.makeDraggable(windowElement);
        
        // Add to container
        this.container.appendChild(windowElement);
        
        return windowElement;
    }

    setupWindowControls(windowElement) {
        const minimizeBtn = windowElement.querySelector('.window-minimize');
        const maximizeBtn = windowElement.querySelector('.window-maximize');
        const closeBtn = windowElement.querySelector('.window-close');
        const appName = windowElement.getAttribute('data-app');

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.minimizeWindow(windowElement);
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', () => {
                this.toggleMaximizeWindow(windowElement);
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeWindow(windowElement);
            });
        }
    }

    makeDraggable(windowElement) {
        const header = windowElement.querySelector('.window-header');
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragOffset.x = e.clientX - windowElement.offsetLeft;
            dragOffset.y = e.clientY - windowElement.offsetTop;
            header.style.cursor = 'grabbing';
            
            // Bring to front when starting drag
            this.bringToFront(windowElement);
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const newLeft = e.clientX - dragOffset.x;
                const newTop = e.clientY - dragOffset.y;
                
                // Keep window within bounds
                const maxLeft = window.innerWidth - windowElement.offsetWidth;
                const maxTop = window.innerHeight - windowElement.offsetHeight - 40; // Account for taskbar
                
                windowElement.style.left = Math.max(0, Math.min(newLeft, maxLeft)) + 'px';
                windowElement.style.top = Math.max(0, Math.min(newTop, maxTop)) + 'px';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            header.style.cursor = 'move';
        });
    }

    registerWindow(appName, windowElement) {
        const windowData = {
            element: windowElement,
            appName: appName,
            isMinimized: false,
            isMaximized: false,
            originalPosition: { left: '50px', top: '50px' },
            originalSize: { width: 'auto', height: 'auto' }
        };

        this.windows.set(appName, windowData);
        
        // Add taskbar button
        const icon = this.getAppIcon(appName);
        const title = this.getAppTitle(appName);
        
        if (window.Desktop) {
            window.Desktop.addTaskbarButton(windowElement.id, title, icon);
        }
    }

    showWindow(windowElement) {
        windowElement.classList.remove('hidden');
        this.setWindowMinimized(windowElement, false);
    }

    hideWindow(windowElement) {
        windowElement.classList.add('hidden');
    }

    minimizeWindow(windowElement) {
        this.hideWindow(windowElement);
        this.setWindowMinimized(windowElement, true);
        
        // Update taskbar button
        if (window.Desktop) {
            window.Desktop.setTaskbarButtonActive(windowElement.id, false);
        }
    }

    setWindowMinimized(windowElement, minimized) {
        const appName = windowElement.getAttribute('data-app');
        const windowData = this.windows.get(appName);
        if (windowData) {
            windowData.isMinimized = minimized;
        }
    }

    toggleMaximizeWindow(windowElement) {
        const appName = windowElement.getAttribute('data-app');
        const windowData = this.windows.get(appName);
        
        if (!windowData) return;

        if (windowData.isMaximized) {
            // Restore
            windowElement.style.left = windowData.originalPosition.left;
            windowElement.style.top = windowData.originalPosition.top;
            windowElement.style.width = windowData.originalSize.width;
            windowElement.style.height = windowData.originalSize.height;
            windowData.isMaximized = false;
        } else {
            // Maximize
            windowData.originalPosition.left = windowElement.style.left;
            windowData.originalPosition.top = windowElement.style.top;
            windowData.originalSize.width = windowElement.style.width;
            windowData.originalSize.height = windowElement.style.height;
            
            windowElement.style.left = '0px';
            windowElement.style.top = '0px';
            windowElement.style.width = '100vw';
            windowElement.style.height = 'calc(100vh - 40px)'; // Account for taskbar
            windowData.isMaximized = true;
        }
    }

    closeWindow(windowElement) {
        const appName = windowElement.getAttribute('data-app');
        
        // Remove from windows map
        this.windows.delete(appName);
        
        // Remove taskbar button
        if (window.Desktop) {
            window.Desktop.removeTaskbarButton(windowElement.id);
        }
        
        // Remove element
        windowElement.remove();
        
        // Update active window
        if (this.activeWindow === windowElement) {
            this.activeWindow = null;
        }
    }

    bringToFront(windowElement) {
        windowElement.style.zIndex = this.zIndexCounter++;
        this.activeWindow = windowElement;
        
        // Update taskbar buttons
        const allButtons = document.querySelectorAll('#taskbar-programs button');
        allButtons.forEach(btn => btn.classList.remove('win-95-button-pressed'));
        
        if (window.Desktop) {
            window.Desktop.setTaskbarButtonActive(windowElement.id, true);
        }
    }

    toggleWindow(windowId) {
        const windowElement = document.getElementById(windowId);
        if (!windowElement) return;

        const appName = windowElement.getAttribute('data-app');
        const windowData = this.windows.get(appName);
        
        if (windowData && windowData.isMinimized) {
            this.showWindow(windowElement);
            this.bringToFront(windowElement);
        } else if (this.activeWindow === windowElement) {
            this.minimizeWindow(windowElement);
        } else {
            this.bringToFront(windowElement);
        }
    }

    getAppIcon(appName) {
        const icons = {
            'portfolio': '📁',
            'mycomputer': '🖥️',
            'games': '🎮',
            'notepad': '📝',
            'internet': '🌐',
            'recycle': '🗑️'
        };
        return icons[appName] || '📄';
    }

    getAppTitle(appName) {
        const titles = {
            'portfolio': 'Portfolio',
            'mycomputer': 'My Computer',
            'games': 'Games',
            'notepad': 'Notepad',
            'internet': 'Internet Explorer',
            'recycle': 'Recycle Bin'
        };
        return titles[appName] || appName;
    }
}

// Initialize window manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.WindowManager = new WindowManager();
}); 