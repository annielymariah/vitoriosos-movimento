export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-500 text-white p-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo e nome do movimento */}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">Vitorioso Movimento</h2>
          </div>

          {/* Links úteis */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-green-200 transition-colors">
              Sobre
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              Eventos
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              Contato
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              Doações
            </a>
          </nav>

          {/* Redes sociais */}
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/seuinstagram" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-200 transition-colors"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            
            <a 
              href="https://tiktok.com/@seutiktok" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-green-200 transition-colors"
            >
              <i className="fab fa-tiktok text-xl"></i>
            </a>
            
            <a 
              href="mailto:contato@vitoriosomovimento.com" 
              aria-label="E-mail"
              className="hover:text-green-200 transition-colors"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>

        {/* Direitos autorais */}
        <div className="mt-8 pt-4 border-t border-green-700 text-center text-sm">
          © {currentYear} Vitorioso Movimento. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};