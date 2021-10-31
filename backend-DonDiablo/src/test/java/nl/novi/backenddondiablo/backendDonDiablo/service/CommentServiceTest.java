package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.BackendDonDiabloApplication;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ContextConfiguration(classes = {BackendDonDiabloApplication.class})
class CommentServiceTest {
    @Autowired
    CommentService commentService;

    @MockBean
    private CommentRepository commentRepository;

    @MockBean
    Comment comment;

    @BeforeEach
    void setUp() {
    }

    @Test
    void testGetComment() {
        comment = new Comment("test");

        Mockito
                .when(commentRepository.findById(comment.getId()))
                .thenReturn(java.util.Optional.ofNullable(comment));

        Optional<Comment> found = commentService.getComment(comment.getId());
        Comment expected = comment;

        assertEquals(expected, found);
    }
}