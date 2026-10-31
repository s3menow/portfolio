const form = document.querySelector('.contact-form');
const formStatus = document.getElementById('form-status');

// Смена темы
const btn = document.getElementById('theme-btn');
btn.addEventListener('click', () => {
    const root = document.documentElement;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
});

// Подсветка текущего раздела в меню
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            links.forEach((a) => {
                a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach((s) => observer.observe(s));

// Отправка формы без перезагрузки

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    button.disabled = true;
    formStatus.textContent = 'Отправляю...';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
            formStatus.textContent = 'Спасибо! Сообщение отправлено.';
            form.reset();
        } else {
            formStatus.textContent = 'Не получилось отправить. Попробуйте ещё раз или напишите на почту.';
        }
    } catch (error) {
        formStatus.textContent = 'Нет связи. Попробуйте позже.';
    }
    button.disabled = false;
});