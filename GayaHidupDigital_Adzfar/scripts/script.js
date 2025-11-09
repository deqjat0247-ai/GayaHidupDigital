// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // CTA Button Animation
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            this.textContent = 'Teruskan Pembelajaran!';
            this.style.backgroundColor = '#4bb543';
            
            setTimeout(() => {
                document.getElementById('konsep').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        });
    }
    
    // Video Play Functionality
    const video = document.getElementById('cyber-video');
    const playButton = document.getElementById('play-video');
    const videoOverlay = document.querySelector('.video-overlay');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            video.play();
            videoOverlay.style.display = 'none';
        });
        
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                videoOverlay.style.display = 'none';
            } else {
                video.pause();
                videoOverlay.style.display = 'flex';
            }
        });
    }
    
    // Audio Toggle
    const audioToggle = document.getElementById('audio-toggle');
    const backgroundAudio = document.getElementById('background-audio');
    
    if (audioToggle && backgroundAudio) {
        let audioPlaying = false;
        
        audioToggle.addEventListener('click', function() {
            if (audioPlaying) {
                backgroundAudio.pause();
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
                audioPlaying = false;
            } else {
                backgroundAudio.play();
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
                audioPlaying = true;
            }
        });
    }
    
    // Quiz Functionality
    const startQuizBtn = document.getElementById('start-quiz');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizQuestions = document.getElementById('quiz-questions');
    const quizResults = document.getElementById('quiz-results');
    const nextQuestionBtn = document.getElementById('next-question');
    const restartQuizBtn = document.getElementById('restart-quiz');
    const scoreElement = document.getElementById('score');
    
    let currentQuestion = 0;
    let score = 0;
    
    const questions = [
        {
            question: "Apakah yang dimaksudkan dengan 'keselamatan siber'?",
            options: [
                "Melindungi peranti dan data digital daripada ancaman",
                "Menggunakan internet untuk berbelanja",
                "Mempelajari cara menggunakan komputer"
            ],
            correct: 0
        },
        {
            question: "Manakah antara berikut BUKAN contoh gaya hidup digital?",
            options: [
                "Membeli-belah di pasaraya fizikal",
                "Menghadiri kelas dalam talian",
                "Berinteraksi dengan rakan melalui media sosial"
            ],
            correct: 0
        },
        {
            question: "Apakah langkah penting untuk melindungi maklumat peribadi dalam talian?",
            options: [
                "Menggunakan kata laluan yang sama untuk semua akaun",
                "Membagikan maklumat peribadi dengan bebas",
                "Menggunakan kata laluan yang kuat dan berbeza untuk setiap akaun"
            ],
            correct: 2
        }
    ];
    
    if (startQuizBtn) {
        startQuizBtn.addEventListener('click', function() {
            quizIntro.style.display = 'none';
            quizQuestions.style.display = 'block';
            showQuestion(currentQuestion);
        });
    }
    
    if (nextQuestionBtn) {
        nextQuestionBtn.addEventListener('click', function() {
            // Check if an option is selected
            const selectedOption = document.querySelector('input[name="quiz"]:checked');
            if (!selectedOption) {
                alert('Sila pilih jawapan sebelum meneruskan.');
                return;
            }
            
            // Check if answer is correct
            if (parseInt(selectedOption.value) === questions[currentQuestion].correct) {
                score++;
            }
            
            // Move to next question or show results
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion(currentQuestion);
            } else {
                showResults();
            }
        });
    }
    
    if (restartQuizBtn) {
        restartQuizBtn.addEventListener('click', function() {
            currentQuestion = 0;
            score = 0;
            quizResults.style.display = 'none';
            quizIntro.style.display = 'block';
        });
    }
    
    function showQuestion(index) {
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.querySelector('.options');
        
        questionText.textContent = `Soalan ${index + 1}: ${questions[index].question}`;
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Add new options
        questions[index].options.forEach((option, i) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = `option${i+1}`;
            input.name = 'quiz';
            input.value = i;
            
            const label = document.createElement('label');
            label.htmlFor = `option${i+1}`;
            label.textContent = option;
            
            optionElement.appendChild(input);
            optionElement.appendChild(label);
            optionsContainer.appendChild(optionElement);
        });
        
        // Update next button text for last question
        if (index === questions.length - 1) {
            nextQuestionBtn.textContent = 'Selesai';
        } else {
            nextQuestionBtn.textContent = 'Seterusnya';
        }
    }
    
    function showResults() {
        quizQuestions.style.display = 'none';
        quizResults.style.display = 'block';
        scoreElement.textContent = `Anda mendapat ${score} daripada ${questions.length} soalan betul.`;
        
        // Add encouraging message based on score
        let message = '';
        if (score === questions.length) {
            message = 'Tahniah! Anda sangat memahami gaya hidup digital.';
        } else if (score >= questions.length / 2) {
            message = 'Bagus! Anda mempunyai pengetahuan asas yang kukuh.';
        } else {
            message = 'Jangan putus asa! Teruskan belajar tentang gaya hidup digital.';
        }
        
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.marginTop = '1rem';
        messageElement.style.fontStyle = 'italic';
        scoreElement.appendChild(messageElement);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        }
    });
    
    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        // Randomize animation duration and delay
        const duration = 6 + Math.random() * 4;
        const delay = Math.random() * 5;
        
        icon.style.animationDuration = `${duration}s`;
        icon.style.animationDelay = `${delay}s`;
    });
    
    // Initialize with navbar style
    window.dispatchEvent(new Event('scroll'));
});

    // Challenges functionality
const challengeButtons = document.querySelectorAll('.challenge-btn');
const solutionsPanel = document.getElementById('solutions-panel');
const solutionTitle = document.getElementById('solution-title');
const solutionDesc = document.getElementById('solution-desc');
const closeSolution = document.getElementById('close-solution');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

const solutions = {
    ketagihan: {
        title: "Mengatasi Ketagihan Digital",
        description: "1. Tetapkan had masa penggunaan peranti<br>2. Aktifkan pengingat rehat<br>3. Lakukan aktiviti luar tanpa peranti<br>4. Gunakan aplikasi pemantauan penggunaan<br>5. Amalkan 'digital detox' hujung minggu"
    },
    keselamatan: {
        title: "Meningkatkan Keselamatan Data",
        description: "1. Gunakan kata laluan yang kuat dan berbeza<br>2. Aktifkan pengesahan dua faktor<br>3. Kemas kini perisian secara berkala<br>4. Elakkan Wi-Fi awam tanpa VPN<br>5. Backup data penting secara berkala"
    },
    imbangan: {
        title: "Mencapai Imbangan Digital-Fizikal",
        description: "1. Tetapkan zon bebas peranti di rumah<br>2. Utamakan interaksi bersemuka<br>3. Rancang aktiviti luar tanpa teknologi<br>4. Amalkan mindfulness dan meditasi<br>5. Tetapkan waktu 'shutdown' digital setiap hari"
    }
};

challengeButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const challengeTypes = ['ketagihan', 'keselamatan', 'imbangan'];
        const challengeType = challengeTypes[index];
        
        solutionTitle.textContent = solutions[challengeType].title;
        solutionDesc.innerHTML = solutions[challengeType].description;
        
        solutionsPanel.style.display = 'block';
        overlay.style.display = 'block';
    });
});

closeSolution.addEventListener('click', function() {
    solutionsPanel.style.display = 'none';
    overlay.style.display = 'none';
});

overlay.addEventListener('click', function() {
    solutionsPanel.style.display = 'none';
    this.style.display = 'none';
});


// Challenges functionality
document.addEventListener('DOMContentLoaded', function() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    const solutionsPanel = document.getElementById('solutions-panel');
    const solutionTitle = document.getElementById('solution-title');
    const solutionDesc = document.getElementById('solution-desc');
    const closeSolution = document.getElementById('close-solution');
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const solutions = {
        ketagihan: {
            title: "Mengatasi Ketagihan Digital",
            description: "1. Tetapkan had masa penggunaan peranti<br>2. Aktifkan pengingat rehat<br>3. Lakukan aktiviti luar tanpa peranti<br>4. Gunakan aplikasi pemantauan penggunaan<br>5. Amalkan 'digital detox' hujung minggu"
        },
        keselamatan: {
            title: "Meningkatkan Keselamatan Data",
            description: "1. Gunakan kata laluan yang kuat dan berbeza<br>2. Aktifkan pengesahan dua faktor<br>3. Kemas kini perisian secara berkala<br>4. Elakkan Wi-Fi awam tanpa VPN<br>5. Backup data penting secara berkala"
        },
        imbangan: {
            title: "Mencapai Imbangan Digital-Fizikal",
            description: "1. Tetapkan zon bebas peranti di rumah<br>2. Utamakan interaksi bersemuka<br>3. Rancang aktiviti luar tanpa teknologi<br>4. Amalkan mindfulness dan meditasi<br>5. Tetapkan waktu 'shutdown' digital setiap hari"
        }
    };

    challengeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const challengeTypes = ['ketagihan', 'keselamatan', 'imbangan'];
            const challengeType = challengeTypes[index];
            
            solutionTitle.textContent = solutions[challengeType].title;
            solutionDesc.innerHTML = solutions[challengeType].description;
            
            solutionsPanel.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    closeSolution.addEventListener('click', function() {
        solutionsPanel.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        solutionsPanel.style.display = 'none';
        this.style.display = 'none';
    });
});

// Fix untuk solutions panel - pastikan betul-betul berfungsi
document.addEventListener('DOMContentLoaded', function() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    const solutionsPanel = document.getElementById('solutions-panel');
    const solutionTitle = document.getElementById('solution-title');
    const solutionDesc = document.getElementById('solution-desc');
    const closeSolution = document.getElementById('close-solution');
    
    // Create overlay jika belum wujud
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }

    const solutions = {
        0: {
            title: "Mengatasi Ketagihan Digital",
            description: "1. Tetapkan had masa penggunaan peranti<br>2. Aktifkan pengingat rehat<br>3. Lakukan aktiviti luar tanpa peranti<br>4. Gunakan aplikasi pemantauan penggunaan<br>5. Amalkan 'digital detox' hujung minggu"
        },
        1: {
            title: "Meningkatkan Keselamatan Data",
            description: "1. Gunakan kata laluan yang kuat dan berbeza<br>2. Aktifkan pengesahan dua faktor<br>3. Kemas kini perisian secara berkala<br>4. Elakkan Wi-Fi awam tanpa VPN<br>5. Backup data penting secara berkala"
        },
        2: {
            title: "Mencapai Imbangan Digital-Fizikal",
            description: "1. Tetapkan zon bebas peranti di rumah<br>2. Utamakan interaksi bersemuka<br>3. Rancang aktiviti luar tanpa teknologi<br>4. Amalkan mindfulness dan meditasi<br>5. Tetapkan waktu 'shutdown' digital setiap hari"
        }
    };

    challengeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            solutionTitle.textContent = solutions[index].title;
            solutionDesc.innerHTML = solutions[index].description;
            
            solutionsPanel.style.display = 'block';
            overlay.style.display = 'block';
        });
    });

    closeSolution.addEventListener('click', function() {
        solutionsPanel.style.display = 'none';
        overlay.style.display = 'none';
    });

    overlay.addEventListener('click', function() {
        solutionsPanel.style.display = 'none';
        this.style.display = 'none';
    });
});

// ===== MODAL FUNCTIONALITY =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById('modal-overlay');
    
    modal.style.display = 'block';
    overlay.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modal-overlay');
    
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners for modal
document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.close-modal');
    const overlay = document.getElementById('modal-overlay');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    overlay.addEventListener('click', closeModal);
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});