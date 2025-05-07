package vitoriososmovimento.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vitoriososmovimento.model.Event;
import vitoriososmovimento.repository.EventRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Event> getEventById(@PathVariable Long id) {
        return eventRepository.findById(id);
    }

    @PutMapping("/{id}")
    public Event updateEvent(@PathVariable Long id, @RequestBody Event newEvent) {
        return eventRepository.findById(id)
                .map(event -> {
                    event.setName(newEvent.getName());
                    event.setDate(newEvent.getDate());
                    event.setDescription(newEvent.getDescription());
                    event.setLocation(newEvent.getLocation());
                    event.setImageUrl(newEvent.getImageUrl());
                    return eventRepository.save(event);
                })
                .orElseThrow(() -> new RuntimeException("Evento não encontrado"));
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
}
