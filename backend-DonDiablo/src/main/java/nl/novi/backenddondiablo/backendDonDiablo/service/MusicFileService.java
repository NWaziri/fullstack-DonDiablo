package nl.novi.backenddondiablo.backendDonDiablo.service;

import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface MusicFileService {

    public void save(MultipartFile file, String uploader) throws IOException;
}
