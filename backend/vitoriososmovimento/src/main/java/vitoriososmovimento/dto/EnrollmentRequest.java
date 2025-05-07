package vitoriososmovimento.dto;

import lombok.Data;

@Data
public class EnrollmentRequest {

    private Long userId;
    private Long eventId;

    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Long getEventId() {
        return eventId;
    }
    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }
}
