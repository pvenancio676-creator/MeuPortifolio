/* =========================================================
   PORTFÓLIO P. VENANCIO
   JAVASCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const header = document.getElementById("header");

const nav = document.getElementById("nav");

const menuButton = document.getElementById("menuButton");

const themeButton = document.getElementById("themeButton");

const filters = document.querySelectorAll(".filter");

const projects = document.querySelectorAll(".project-card");

const revealElements = document.querySelectorAll(".reveal");

const sections = document.querySelectorAll("main section[id]");

const navLinks = document.querySelectorAll(".nav__link");


/* =========================================================
   HEADER
   ========================================================= */

function updateHeader() {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =========================================================
   MENU MOBILE
   ========================================================= */

if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    /*
        Fecha o menu quando o usuário
        clica em algum item.
    */

    document
        .querySelectorAll(".nav__link")
        .forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =========================================================
   TEMA CLARO / ESCURO
   =========================================================

   O tema escolhido fica salvo no navegador.
*/

const savedTheme =
    localStorage.getItem(
        "portfolio-theme"
    );


/*
    Se o usuário já tinha escolhido
    o tema claro, mantém ele.
*/

function applyTheme(theme) {
    document.body.classList.toggle("light", theme === "light");
    if (themeButton) {
        const label = theme === "light" ? "Ativar tema escuro" : "Ativar tema claro";
        themeButton.setAttribute("aria-label", label);
        themeButton.setAttribute("title", label);
    }
}

if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
} else {
    applyTheme("dark");
}


/*
    Botão de troca de tema.
*/

if (themeButton) {

    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );

            const currentTheme =
                document.body.classList.contains(
                    "light"
                )
                    ? "light"
                    : "dark";


            localStorage.setItem(
                "portfolio-theme",
                currentTheme
            );

        }
    );

}


/* =========================================================
   FILTRO DOS PROJETOS
   ========================================================= */

filters.forEach((filter) => {

    filter.addEventListener(
        "click",
        () => {

            /*
                Remove o estado ativo
                de todos os filtros.
            */

            filters.forEach((item) => {

                item.classList.remove(
                    "active"
                );

            });


            /*
                Ativa o filtro clicado.
            */

            filter.classList.add(
                "active"
            );


            /*
                Descobre qual categoria
                foi escolhida.
            */

            const selectedCategory =
                filter.dataset.filter;


            /*
                Mostra ou esconde os projetos.
            */

            projects.forEach((project) => {

                const projectCategory =
                    project.dataset.category;


                const shouldShow =
                    selectedCategory === "todos" ||
                    projectCategory ===
                    selectedCategory;


                project.classList.toggle(
                    "is-hidden",
                    !shouldShow
                );

            });

        }
    );

});


/* =========================================================
   ANIMAÇÕES AO ENTRAR NA TELA
   ========================================================= */

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );


                    /*
                        Depois de revelar,
                        não precisamos observar
                        esse elemento novamente.
                    */

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);


/* =========================================================
   MENU ATIVO CONFORME A SEÇÃO
   ========================================================= */

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (
                    !entry.isIntersecting
                ) {
                    return;
                }


                /*
                    Descobre qual seção está
                    atualmente visível.
                */

                const currentSection =
                    entry.target.id;


                /*
                    Atualiza o item correspondente
                    no menu.
                */

                navLinks.forEach((link) => {

                    const linkTarget =
                        link.getAttribute(
                            "href"
                        );


                    link.classList.toggle(
                        "active",
                        linkTarget ===
                        `#${currentSection}`
                    );

                });

            });

        },
        {
            rootMargin:
                "-35% 0px -55% 0px"
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =========================================================
   FECHAR MENU AO REDIMENSIONAR
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            Se voltar para desktop,
            garante que o menu mobile
            não fique aberto.
        */

        if (
            window.innerWidth > 780
        ) {

            nav.classList.remove(
                "open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   ESC PARA FECHAR O MENU
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            nav.classList.remove(
                "open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);