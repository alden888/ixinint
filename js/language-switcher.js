document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.getElementById('languageSwitcher');
    
    if (languageSwitcher) {
        languageSwitcher.addEventListener('change', function() {
            const selectedLang = this.value;
            const currentPath = window.location.pathname;
            
            // Get the current page name (e.g., "about.html", "contact.html")
            const pageName = currentPath.split('/').pop();
            const isHomePage = pageName === '' || pageName === 'index.html' || pageName === 'zh.html';
            
            let newPath;
            
            if (selectedLang === 'zh') {
                if (isHomePage) {
                    newPath = '/zh.html';
                } else {
                    newPath = `/zh/${pageName}`;
                }
            } else {
                if (isHomePage) {
                    newPath = '/';
                } else {
                    // Remove /zh/ prefix if exists
                    newPath = currentPath.replace('/zh/', '/');
                }
            }
            
            // Handle special cases for home page
            if (newPath === '/') {
                newPath = '/index.html';
            }
            
            window.location.href = newPath;
        });
    }
});
