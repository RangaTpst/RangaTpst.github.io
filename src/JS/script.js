document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const stickyHeader = document.createElement('div'); // Crée le sticky header
    stickyHeader.id = 'sticky-header';

    // Ajoute le contenu au sticky header
    stickyHeader.innerHTML = `
        <img src="src/images/svg/logo.svg" alt="Logo" class="logo">
        <nav class="main-menu">
            <ul>
                <li><a href="#header">Accueil</a></li>
                <li><a href="#A_propo">A propo</a></li>
                <li><a href="#">Projets</a></li>
                <li><a href="#">Mon cv</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    `;
    stickyHeader.classList.add('hidden'); // Initialement masqué
    document.body.appendChild(stickyHeader);

    // Ajoute un écouteur de défilement
    window.addEventListener('scroll', () => {
        if (window.scrollY > header.offsetHeight) {
            stickyHeader.classList.add('visible');
            stickyHeader.classList.remove('hidden');
        } else {
            stickyHeader.classList.add('hidden');
            stickyHeader.classList.remove('visible');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    setTimeout(() => {
        logo.classList.add('animate-logo');
    }, 500); // Délai de 500ms
});
