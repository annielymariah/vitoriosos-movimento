package vitoriososmovimento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vitoriososmovimento.model.Enrollment;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    boolean existsByUserIdAndEventId(Long userId, Long eventId);

    List<Enrollment> findByEventId(Long eventId);

    List<Enrollment> findByUserId(Long userId);
}