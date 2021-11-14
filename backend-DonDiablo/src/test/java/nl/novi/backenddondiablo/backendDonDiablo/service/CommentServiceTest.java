package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.BackendDonDiabloApplication;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    @InjectMocks
    private CommentService commentService;

    @Mock
    private CommentRepository commentRepository;

    @Mock
    Comment comment;


    @Test
    void testGetComment() {
        comment = new Comment("test");

        Mockito
                .when(commentRepository.findById(comment.getId()))
                .thenReturn(java.util.Optional.ofNullable(comment));

        Comment found = commentService.getComment(comment.getId()).orElseThrow();
        Comment expected = comment;

        assertEquals(expected, found);
    }

}