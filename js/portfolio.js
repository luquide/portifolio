// Portfolio Application Module
class PortfolioApp {
    constructor() {
        this.skillsChart = null;
        this.currentSection = 'home';
        this.portfolioContent = this.createPortfolioContent();
    }

    // Called when portfolio window is opened
    initialize(windowElement) {
        const contentArea = windowElement.querySelector('.window-content');
        if (contentArea) {
            contentArea.innerHTML = this.portfolioContent;
            this.setupNavigation(windowElement);
            this.setupGuestbook(windowElement);
            this.setupProjectModals(windowElement);
        }
    }

    createPortfolioContent() {
        return `
            <!-- Home Section -->
            <section id="home" class="content-section">
                <div class="flex items-center gap-4 mb-6">
                    <div class="win-95-border-inset p-2 bg-black text-green-400 font-mono text-sm">
                        <div class="animate-pulse">█</div>
                        <div>SYSTEM.EXE</div>
                        <div>LOADING...</div>
                    </div>
                    <div>
                        <h2 class="text-3xl mb-2">Bem-vindo ao meu Portfólio!</h2>
                        <p>Um portal para os meus projetos, inspirado na era de ouro da internet.</p>
                    </div>
                </div>
                <hr class="my-6 win-95-border-inset">
                <p class="mb-4">Navegue pelas seções usando o menu acima para explorar meus trabalhos, conhecer mais sobre mim ou entrar em contato.</p>
                <div class="text-center">
                    <div class="win-95-border inline-block p-2 bg-yellow-200 animate-pulse">
                        <div class="text-red-600 font-bold">⚠️ UNDER CONSTRUCTION ⚠️</div>
                        <div class="text-sm">Este site está em desenvolvimento</div>
                    </div>
                </div>
            </section>

            <!-- Projects Section -->
            <section id="projects" class="content-section hidden">
                <h2 class="text-3xl mb-4">Meus Projetos</h2>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div class="project-item text-center cursor-pointer" 
                         data-title="Projeto Alpha" 
                         data-desc="Uma aplicação inovadora de gerenciamento de tarefas com Node.js e Expo. Sistema completo com autenticação, sincronização em tempo real e interface intuitiva." 
                         data-tech="Node.js, Expo, React Native, MongoDB" 
                         data-img="https://placehold.co/400x300/008080/FFFFFF?text=Alpha+App"
                         data-link="https://github.com/seuusuario/projeto-alpha">
                        <div class="w-16 h-16 mx-auto win-95-border flex items-center justify-center bg-teal-600 text-white font-bold text-xl">
                            📱
                        </div>
                        <p class="mt-2 text-sm">Projeto_Alpha.exe</p>
                    </div>
                    <div class="project-item text-center cursor-pointer" 
                         data-title="E-commerce Beta" 
                         data-desc="Um e-commerce completo com foco na experiência do usuário e performance. Inclui carrinho de compras, sistema de pagamento e painel administrativo." 
                         data-tech="React, Express, MongoDB, Stripe" 
                         data-img="https://placehold.co/400x300/800080/FFFFFF?text=E-commerce"
                         data-link="https://github.com/seuusuario/ecommerce-beta">
                        <div class="w-16 h-16 mx-auto win-95-border flex items-center justify-center bg-purple-600 text-white font-bold text-xl">
                            🛒
                        </div>
                        <p class="mt-2 text-sm">Ecommerce_Beta.jar</p>
                    </div>
                    <div class="project-item text-center cursor-pointer" 
                         data-title="Ferramenta Gamma" 
                         data-desc="Uma ferramenta de visualização de dados para análise de mercado. Gráficos interativos e relatórios em tempo real." 
                         data-tech="JavaScript, Chart.js, D3.js, HTML/CSS" 
                         data-img="https://placehold.co/400x300/0000FF/FFFFFF?text=Data+Viz"
                         data-link="https://github.com/seuusuario/data-tool-gamma">
                        <div class="w-16 h-16 mx-auto win-95-border flex items-center justify-center bg-blue-600 text-white font-bold text-xl">
                            📊
                        </div>
                        <p class="mt-2 text-sm">Data_Tool_Gamma.bat</p>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="content-section hidden">
                <h2 class="text-3xl mb-4">Sobre Mim</h2>
                <div class="flex flex-col md:flex-row gap-6">
                    <div class="win-95-border p-2 bg-gray-100 self-start">
                        <div class="w-24 h-32 bg-gradient-to-b from-gray-300 to-gray-500 flex items-center justify-center text-4xl">
                            👨‍💻
                        </div>
                        <div class="text-center mt-2 text-xs">profile.jpg</div>
                    </div>
                    <div class="flex-1">
                        <p class="mb-4 text-sm">Sou um desenvolvedor apaixonado por criar soluções tecnológicas e explorar a intersecção entre código e design. Com experiência em desenvolvimento full-stack, busco sempre aprender e aplicar novas tecnologias para resolver problemas complexos.</p>
                        <p class="mb-4 text-sm">Especializado em JavaScript, React, Node.js e tecnologias web modernas. Tenho experiência com desenvolvimento mobile, APIs REST, bancos de dados e deploy em nuvem.</p>
                        <hr class="my-4 win-95-border-inset">
                        <h3 class="text-xl mb-2">Habilidades Técnicas</h3>
                        <div class="chart-container h-48">
                            <canvas id="skillsChart"></canvas>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="content-section hidden">
                <h2 class="text-3xl mb-4">Contato</h2>
                <p class="mb-6 text-sm">Vamos conversar! Envie uma mensagem ou me encontre nas redes abaixo.</p>
                
                <div class="space-y-3 mb-6">
                    <div class="flex items-center gap-3">
                        <div class="contact-icon bg-red-500 win-95-border flex items-center justify-center text-white font-bold">
                            📧
                        </div>
                        <a href="mailto:contato@seudominio.com" class="text-blue-700 underline hover:bg-yellow-200 p-1 text-sm">contato@seudominio.com</a>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <div class="contact-icon bg-blue-600 win-95-border flex items-center justify-center text-white font-bold">
                            in
                        </div>
                        <a href="https://linkedin.com/in/seuusuario" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:bg-yellow-200 p-1 text-sm">LinkedIn</a>
                    </div>
                    
                    <div class="flex items-center gap-3">
                        <div class="contact-icon bg-black win-95-border flex items-center justify-center text-white font-bold">
                            GH
                        </div>
                        <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer" class="text-blue-700 underline hover:bg-yellow-200 p-1 text-sm">GitHub</a>
                    </div>
                </div>
                
                <hr class="my-6 win-95-border-inset">
                
                <h3 class="text-xl mb-2">Guestbook</h3>
                <div id="guestbook-entries" class="win-95-border-inset p-2 h-24 overflow-y-scroll mb-4 bg-white text-xs">
                    <p><strong>Visitante1:</strong> Site incrível! Pura nostalgia dos anos 90! 🖥️</p>
                    <p><strong>DevAmigo:</strong> Adorei os projetos, parabéns pelo trabalho!</p>
                    <p><strong>RetroFan:</strong> Que saudade dessa época da internet! 💾</p>
                </div>
                <form id="guestbook-form" class="flex flex-col sm:flex-row gap-2">
                    <input type="text" id="guestbook-name" placeholder="Seu nome" class="win-95-border-inset p-1 flex-grow text-xs" maxlength="50">
                    <input type="text" id="guestbook-message" placeholder="Sua mensagem" class="win-95-border-inset p-1 flex-grow-[2] text-xs" maxlength="200">
                    <button type="submit" class="win-95-button text-xs px-2 py-1">Assinar</button>
                </form>
            </section>

            <!-- Project Modal -->
            <div id="projectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center p-4 z-50">
                <div class="w-full max-w-md bg-[#c0c0c0] win-95-border flex flex-col">
                    <div class="bg-[#000080] text-white p-1 flex justify-between items-center">
                        <h3 id="modalTitle" class="font-bold text-sm">Detalhes do Projeto</h3>
                        <button id="closeModal" class="w-6 h-6 bg-[#c0c0c0] win-95-border font-bold text-black text-xs">✕</button>
                    </div>
                    <div class="p-4 win-95-border-inset bg-white">
                        <img id="modalImg" src="" alt="Project Image" class="w-full h-32 object-cover mb-4 win-95-border">
                        <p id="modalDesc" class="mb-4 text-sm"></p>
                        <p class="text-sm"><strong>Tecnologias:</strong> <span id="modalTech"></span></p>
                        <div class="mt-4 text-right">
                            <a id="modalLink" href="#" target="_blank" rel="noopener noreferrer" class="win-95-button inline-block text-xs px-2 py-1">Ver Projeto</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupNavigation(windowElement) {
        const navLinks = windowElement.querySelectorAll('.nav-link');
        const contentSections = windowElement.querySelectorAll('.content-section');

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const targetId = link.getAttribute('data-target');
                
                contentSections.forEach(section => {
                    section.classList.add('hidden');
                });
                
                const targetSection = windowElement.querySelector(`#${targetId}`);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                }

                navLinks.forEach(nav => nav.classList.remove('underline'));
                link.classList.add('underline');
                
                this.currentSection = targetId;
                
                if (targetId === 'about') {
                    this.renderSkillsChart(windowElement);
                }
            });
        });
    }

    setupGuestbook(windowElement) {
        const guestbookForm = windowElement.querySelector('#guestbook-form');
        const guestbookEntries = windowElement.querySelector('#guestbook-entries');
        
        if (guestbookForm && guestbookEntries) {
            guestbookForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameInput = windowElement.querySelector('#guestbook-name');
                const messageInput = windowElement.querySelector('#guestbook-message');
                
                const name = nameInput.value.trim();
                const message = messageInput.value.trim();

                if (name && message) {
                    const newEntry = document.createElement('p');
                    newEntry.innerHTML = `<strong>${name}:</strong> ${message}`;
                    guestbookEntries.appendChild(newEntry);
                    guestbookEntries.scrollTop = guestbookEntries.scrollHeight;

                    nameInput.value = '';
                    messageInput.value = '';
                }
            });
        }
    }

    setupProjectModals(windowElement) {
        const projectItems = windowElement.querySelectorAll('.project-item');
        const modal = windowElement.querySelector('#projectModal');
        const closeModal = windowElement.querySelector('#closeModal');
        
        projectItems.forEach(item => {
            item.addEventListener('click', () => {
                const modalTitle = windowElement.querySelector('#modalTitle');
                const modalImg = windowElement.querySelector('#modalImg');
                const modalDesc = windowElement.querySelector('#modalDesc');
                const modalTech = windowElement.querySelector('#modalTech');
                const modalLink = windowElement.querySelector('#modalLink');
                
                modalTitle.textContent = item.dataset.title;
                modalImg.src = item.dataset.img;
                modalDesc.textContent = item.dataset.desc;
                modalTech.textContent = item.dataset.tech;
                modalLink.href = item.dataset.link || '#';
                
                modal.classList.remove('hidden');
                modal.classList.add('flex');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            });
        }
        
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add('hidden');
                    modal.classList.remove('flex');
                }
            });
        }
    }

    renderSkillsChart(windowElement) {
        const canvas = windowElement.querySelector('#skillsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (this.skillsChart) {
            this.skillsChart.destroy();
        }

        Chart.defaults.font.family = "'VT323', monospace";
        Chart.defaults.font.size = 12;
        Chart.defaults.color = '#000';

        this.skillsChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['JavaScript', 'React/RN', 'Node.js', 'HTML/CSS', 'Databases'],
                datasets: [{
                    label: 'Proficiência',
                    data: [90, 85, 80, 95, 75],
                    backgroundColor: '#008080',
                    borderColor: '#000000',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#FFFFE1',
                        titleColor: '#000',
                        bodyColor: '#000',
                        borderColor: '#000',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: '#808080'
                        },
                        ticks: {
                            color: '#000',
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#000',
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize portfolio app and extend WindowManager
document.addEventListener('DOMContentLoaded', () => {
    const portfolioApp = new PortfolioApp();
    
    // Override window creation for portfolio
    if (window.WindowManager) {
        const originalCreateWindow = window.WindowManager.createWindow;
        window.WindowManager.createWindow = function(appName) {
            const windowElement = originalCreateWindow.call(this, appName);
            
            // Initialize portfolio content if it's a portfolio window
            if (appName === 'portfolio' && windowElement) {
                portfolioApp.initialize(windowElement);
            }
            
            return windowElement;
        };
    }
}); 