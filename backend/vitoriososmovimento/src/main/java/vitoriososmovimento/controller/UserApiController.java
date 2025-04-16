package vitoriososmovimento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import vitoriososmovimento.model.User;
import vitoriososmovimento.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // Permite acesso do frontend
public class UserApiController {

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // GET /api/usuarios - lista todos os usuários
    @GetMapping
    public List<User> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // POST /api/usuarios - cria um novo usuário
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody User user) {
        Optional<User> existente = usuarioRepository.findByEmail(user.getEmail());
        if (existente.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado");
        }

        user.setSenha(passwordEncoder.encode(user.getSenha()));
        usuarioRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
}
