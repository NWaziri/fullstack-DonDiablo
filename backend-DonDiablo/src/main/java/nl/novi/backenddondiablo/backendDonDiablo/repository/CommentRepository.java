package nl.novi.backenddondiablo.backendDonDiablo.repository;

import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
