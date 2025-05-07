package vitoriososmovimento.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vitoriososmovimento.model.Enrollment;
import vitoriososmovimento.service.EnrollmentService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    @PostMapping
    public ResponseEntity<Enrollment> enrollUser(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Long eventId = request.get("eventId");
        Enrollment enrollment = enrollmentService.enrollUser(userId, eventId);
        return ResponseEntity.ok(enrollment);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByEvent(@PathVariable Long eventId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByEvent(eventId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(enrollmentService.getEnrollmentsByUser(userId));
    }
}
