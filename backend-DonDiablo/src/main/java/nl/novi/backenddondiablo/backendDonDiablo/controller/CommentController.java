package nl.novi.backenddondiablo.backendDonDiablo.controller;

import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/comment")
public class CommentController {

    CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<Object> createComment(Comment comment) {
        comment.setContent("Empty comment");
        commentService.createComment(comment);
        return new ResponseEntity<Object>("Comment created", HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Object> getComment(@PathVariable Long id) {
        return ResponseEntity.ok().body(commentService.getComment(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Object> changeComment(@PathVariable("id") Long id, @RequestBody Comment comment) {
        commentService.updateComment(id, comment);
        return ResponseEntity.noContent().build();
    }
}
