package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.BackendDonDiabloApplication;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import nl.novi.backenddondiablo.backendDonDiablo.repository.MusicFileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
//@SpringBootTest
//@ContextConfiguration(classes = {BackendDonDiabloApplication.class})
@ExtendWith(MockitoExtension.class)
public class MusicFileServiceImplementationTest {
    @InjectMocks
    private MusicFileServiceImplementation musicFileService;

    @Mock
    private MusicFileRepository musicFileRepository;

    @Mock
    MusicFile musicFile;

//    @BeforeEach
//    void setUp() {
//    }

    @Test
    public void GetMusicFile() {
        musicFile = new MusicFile();
        Comment comment = new Comment("Empty");
        musicFile.setUploadDate("2021/10/29");
        musicFile.setFileName("test.mp3");
        musicFile.setUploader("nang");
        musicFile.setComment(comment);

        Mockito
                .when(musicFileRepository.getMusicFileByUploader(musicFile.getUploader()))
                .thenReturn(musicFile);

        MusicFile expected = musicFile;
        MusicFile found = musicFileService.getMusicFile(musicFile.getUploader());

        assertEquals(expected, found);
    }

}