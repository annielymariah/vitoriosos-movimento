package vitoriososmovimento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vitoriososmovimento.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {

}
