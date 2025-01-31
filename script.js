document.addEventListener('DOMContentLoaded', () => {
    let currentQuizIndex = parseInt(localStorage.getItem('currentQuizIndex')) || 0;
    let totalReward = parseFloat(localStorage.getItem('totalReward')) || 0;
    const maxTotalReward = 504.64;

    const wasShowingFinal = localStorage.getItem('showingFinal') === 'true';
    if (wasShowingFinal) {
        currentQuizIndex = 0;
        totalReward = 0;
        localStorage.clear();
    }

    function animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const startValue = parseFloat(start);
        const endValue = parseFloat(end);
        const change = endValue - startValue;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (change * easeOutQuart);

            element.textContent = `R$${currentValue.toFixed(2)}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const totalRewardElement = document.getElementById('total-reward');
    animateNumber(totalRewardElement, 0, totalReward);

    const rewards = [64.22, 58.50, 72.30, 65.80, 70.10, 68.90, 60.42, 44.40];

    const companies = [
        {
            name: 'Apple',
            verified: true,
            image: 'historia-do-logotipo-da-apple-tudo-sobre-o-apple-logo-evolution-5-1024x683.jpg',
            productImage: 'Imagem-do-WhatsApp-de-2025-01-16-as-06.40.03_cd80f5d4.jpg',
            likes: '9.7k',
            question: 'Qual é a sua avaliação sobre os produtos da Apple?'
        },
        {
            name: 'Nubank',
            verified: true,
            image: 'nubank-logo-2-1.png',
            productImage: '1713457656-2-dobra-home-mobile.jpg',
            likes: '12.3k',
            question: 'Como você avalia os serviços do Nubank?'
        },
        {
            name: 'Toyota',
            verified: true,
            image: 'toyota-170.png',
            productImage: 'ca-7b2f-4ce3-8eb5-64d785f59fe3.jpeg',
            likes: '15.1k', 
            question: 'Qual sua opinião sobre os carros da Toyota?'
        },
        {
            name: 'Meta',
            verified: true,
            image: 'meeeb0bacadee2847ccf95730127a1c8cb0.jpg',
            productImage: 'meeeemiages.jpg',
            likes: '8.9k',
            question: 'Como você avalia os serviços Meta?'
        },
        {
            name: 'Uber',
            verified: true,
            image: 'uber-logo-1-1.png',
            productImage: 'aplicativos-de-transporte-uber.jpg',
            likes: '11.2k',
            question: 'Qual sua experiência com os serviços uber?'
        },
        {
            name: 'McDonalds',
            verified: true,
            image: 'mcdonal.png',
            productImage: 'foodmcdona.jpg',
            likes: '14.5k',
            question: 'Como você avalia os produtos McDonalds?'
        },
        {
            name: 'Bradesco',
            verified: true,
            image: 'bradesco-logo-4.png',
            productImage: 'bradesco-fachada.jpg',
            likes: '10.8k',
            question: 'Qual sua avaliação sobre o Bradesco?'
        },
        {
            name: 'Netflix',
            verified: true,
            image: 'Netflix-Symbol.png',
            productImage: 'neflixx8hyqfilmepipoca.jpg',
            likes: '13.4k',
            question: 'Como você avalia os serviços da Netflix?'
        }
    ];

    function updateProgress() {
        const progress = document.getElementById('progress');
        const percentage = (currentQuizIndex / companies.length) * 100;
        progress.style.width = `${percentage}%`;
    }

    function updateTotalReward() {
        const totalRewardElement = document.getElementById('total-reward');
        const previousValue = parseFloat(totalRewardElement.textContent.replace('R$', ''));
        animateNumber(totalRewardElement, previousValue, totalReward);
        localStorage.setItem('totalReward', totalReward.toString());
    }

    function showRewardModal(reward) {
        const modal = document.getElementById('reward-modal');
        const rewardElement = document.getElementById('modal-reward-amount');
        modal.style.display = 'flex';
        animateNumber(rewardElement, 0, reward, 1500);
    }

    function showFinalModal() {
        const modal = document.getElementById('final-modal');
        const finalAmountElement = document.getElementById('final-amount');
        modal.style.display = 'flex';
        animateNumber(finalAmountElement, 0, totalReward, 2000);
        localStorage.setItem('showingFinal', 'true');
    }

    function hideModals() {
        document.getElementById('reward-modal').style.display = 'none';
        document.getElementById('final-modal').style.display = 'none';
    }

    function renderQuiz(company) {
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="profile">
                <img src="${company.image}" alt="${company.name}" class="profile-img">
                <span class="profile-name">
                    ${company.name} 
                    ${company.verified ? `
                        <span class="verified">
                            <svg viewBox="0 0 20 20" height="20" width="20" preserveAspectRatio="xMidYMid meet" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.595 8.23978L17.7696 9.43025L17.7615 9.42221C18.0795 9.74022 18.0795 10.2538 17.7614 10.5718L16.5868 11.7623L17.011 13.3849C17.117 13.817 16.8641 14.2655 16.4318 14.3797L14.8167 14.82L14.3762 16.4345C14.2539 16.8666 13.8134 17.1275 13.3811 17.0134L11.7578 16.5894L10.5669 17.7635C10.4119 17.9185 10.1998 18 9.99592 18C9.792 18 9.57991 17.9185 9.42493 17.7635L8.234 16.5894L6.61076 17.0134C6.17844 17.1275 5.7298 16.8666 5.6156 16.4345L5.17512 14.82L3.56003 14.3797C3.13587 14.2574 2.87484 13.817 2.98904 13.3849L3.4132 11.7623L2.23859 10.5718C1.92047 10.2538 1.92047 9.74009 2.23859 9.42209L3.4132 8.23162L2.98904 6.60899C2.87484 6.17684 3.12771 5.72837 3.56003 5.61422L5.17512 5.17391L5.6156 3.55943C5.73796 3.13543 6.17844 2.87451 6.61076 2.98866L8.234 3.41266L9.42493 2.2385C9.74305 1.9205 10.2569 1.9205 10.5751 2.2385L11.766 3.41266L13.3892 2.98866C13.8216 2.88266 14.2702 3.13543 14.3844 3.56759L14.8249 5.18206L16.44 5.62237C16.8723 5.74468 17.1333 6.18499 17.0191 6.61715L16.595 8.23978ZM9.37506 12.7678C9.21482 12.9279 9.01452 13 8.80621 13C8.5979 13 8.3976 12.9199 8.23736 12.7678L6.23435 10.7658C5.92188 10.4535 5.92188 9.94895 6.23435 9.63664C6.54682 9.32432 7.05158 9.32432 7.36405 9.63664L8.7982 11.0701L12.636 7.23423C12.9484 6.92192 13.4532 6.92192 13.7656 7.23423C14.0781 7.54655 14.0781 8.05105 13.7656 8.36336L11.5784 10.5656L9.37506 12.7678Z" fill="#007BFC"/>
                            </svg>
                        </span>
                    ` : ''}
                </span>
            </div>

            <div class="post-image">
                <img src="${company.productImage}" alt="${company.name}" class="main-image">
            </div>

            <div class="likes">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>${company.likes} mil curtidas</span>
            </div>

            <div class="question">
                <h2>${company.question}</h2>
            </div>

            <div class="options">
                <button class="option-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Excelente
                </button>
                <button class="option-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Boa
                </button>
                <button class="option-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Regular
                </button>
                <button class="option-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    Ruim
                </button>
            </div>

            <button class="continue-btn" disabled>Continuar</button>

            <div class="bonus">
                <p>Concorra a um bônus adicional</p>
            </div>

            <div class="terms">
                <p>Ao participar das atividades de recompensa, você concorda com nossos <a href="#">Termos e Condições</a></p>
            </div>
        `;

        const optionButtons = quizContent.querySelectorAll('.option-btn');
        const continueButton = quizContent.querySelector('.continue-btn');
        let selectedOption = null;

        const savedSelection = localStorage.getItem(`quiz_${currentQuizIndex}_selection`);
        if (savedSelection !== null) {
            optionButtons[parseInt(savedSelection)].classList.add('selected');
            selectedOption = optionButtons[parseInt(savedSelection)];
            continueButton.disabled = false;
        }

        optionButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                optionButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                selectedOption = button;
                continueButton.disabled = false;
                localStorage.setItem(`quiz_${currentQuizIndex}_selection`, index.toString());
            });
        });

        continueButton.addEventListener('click', () => {
            if (selectedOption) {
                const reward = rewards[currentQuizIndex];
                totalReward += reward;
                updateTotalReward();

                const isLastQuiz = currentQuizIndex === companies.length - 1;

                if (isLastQuiz) {
                    showRewardModal(reward);
                } else {
                    showRewardModal(reward);
                }
            }
        });

        updateProgress();
    }

    document.querySelector('.continue-modal-btn').addEventListener('click', () => {
        hideModals();
        currentQuizIndex++;
        localStorage.setItem('currentQuizIndex', currentQuizIndex.toString());
        if (currentQuizIndex < companies.length) {
            renderQuiz(companies[currentQuizIndex]);
        } else {
            showFinalModal();
        }
    });

    document.querySelector('.withdraw-btn').addEventListener('click', () => {
        alert('Parabéns! Seu saque será processado em breve.');
        hideModals();
        localStorage.clear();
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        hideModals();
        currentQuizIndex++;
        localStorage.setItem('currentQuizIndex', currentQuizIndex.toString());
        if (currentQuizIndex < companies.length) {
            renderQuiz(companies[currentQuizIndex]);
        } else {
            showFinalModal();
        }
    });

    renderQuiz(companies[currentQuizIndex]);
});