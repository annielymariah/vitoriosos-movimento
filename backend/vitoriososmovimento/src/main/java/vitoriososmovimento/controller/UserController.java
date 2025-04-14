package vitoriososmovimento.controller;

import vitoriososmovimento.model.User;
import vitoriososmovimento.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


@Controller
public class UserController {

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Página de cadastro
    @GetMapping("/cadastro")
    public String cadastroPage() {
        return "cadastro";
    }

    // Processa o cadastro
    @PostMapping("/cadastro")
    public String cadastrarUsuario(
            @RequestParam String nome,
            @RequestParam String email,
            @RequestParam String senha,
            Model model) {

        if (usuarioRepository.findByEmail(email).isPresent()) {
            model.addAttribute("erro", "E-mail já cadastrado!");
            return "cadastro";
        }

        User usuario = new User();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha));

        usuarioRepository.save(usuario);
        return "redirect:/login";
    }

    // Página de login (gerenciada pelo Spring Security)
    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // Página após login
    @GetMapping("/home")
    public String homePage() {
        return "home";
    }
}
