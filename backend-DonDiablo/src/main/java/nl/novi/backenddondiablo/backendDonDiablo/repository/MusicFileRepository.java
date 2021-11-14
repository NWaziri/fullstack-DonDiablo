package nl.novi.backenddondiablo.backendDonDiablo.repository;

import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicFileRepository extends JpaRepository<MusicFile, Long> {
    MusicFile getMusicFileByUploader(String uploader); // alleen deze testen
    List<MusicFile> getMusicFilesByUploader(String uploader);
}
