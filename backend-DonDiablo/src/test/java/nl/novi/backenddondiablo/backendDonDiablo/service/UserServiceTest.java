package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.model.Authority;
import nl.novi.backenddondiablo.backendDonDiablo.model.User;
import nl.novi.backenddondiablo.backendDonDiablo.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    User user;

    @Test
    void getUser() {
        user = new User();

        Mockito
                .when(userService.getUser("nang"))
                .thenReturn(java.util.Optional.ofNullable(user));

        User found = userRepository.findById("nang").orElseThrow();
        User expected = user;

        assertEquals(expected, found);
    }

    @Test
    void userExists() {
        user = new User();

        Mockito
                .when(userService.userExists("test"))
                .thenReturn(true);

        Boolean found = userService.userExists("test");

        assertEquals(true, found);

    }
}