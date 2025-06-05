 // Cierra el menú al hacer clic en cualquier enlace del menú
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('menu-toggle').checked = false;
            });
        });