package vitoriososmovimento.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vitoriososmovimento.model.Enrollment;
import vitoriososmovimento.model.Event;
import vitoriososmovimento.model.User;
import vitoriososmovimento.repository.EnrollmentRepository;
import vitoriososmovimento.repository.EventRepository;
import vitoriososmovimento.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    @Transactional
    public Enrollment enrollUser(Long userId, Long eventId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Event> event = eventRepository.findById(eventId);

        if (user.isEmpty() || event.isEmpty()) {
            throw new IllegalArgumentException("Usuário ou evento não encontrado");
        }

        if (enrollmentRepository.existsByUserIdAndEventId(userId, eventId)) {
            throw new IllegalArgumentException("Usuário já está inscrito nesse evento");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user.get());
        enrollment.setEvent(event.get());
        enrollment.setEnrollmentDate(LocalDateTime.now());

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByEvent(Long eventId) {
        return enrollmentRepository.findByEventId(eventId);
    }

    public List<Enrollment> getEnrollmentsByUser(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }
}

