package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.exception.UserNotFoundException;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.model.User;
import nl.novi.backenddondiablo.backendDonDiablo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {

    CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public void createComment(Comment comment) {
        commentRepository.save(comment);
    }

    public Optional<Comment> getComment(Long id) {
        return commentRepository.findById(id);
    }

    public void updateComment(Long id, Comment newComment) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        Comment comment = commentOptional.get();
        comment.setContent(newComment.getContent());
        commentRepository.save(comment);
    }
};
