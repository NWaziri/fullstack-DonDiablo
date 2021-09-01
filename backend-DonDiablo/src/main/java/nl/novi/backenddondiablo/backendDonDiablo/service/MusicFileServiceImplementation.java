package nl.novi.backenddondiablo.backendDonDiablo.service;

import helpers.CurrentDate;
import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import nl.novi.backenddondiablo.backendDonDiablo.repository.MusicFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class MusicFileServiceImplementation implements MusicFileService {

    @Autowired
    private MusicFileRepository musicFileRepository;

    @Override
    public void save(MultipartFile file, String uploader) throws IOException {
        // generate date string
        CurrentDate currentDate = new CurrentDate();
        String date = currentDate.generateDate();

        MusicFile musicFile = new MusicFile();
        musicFile.setFileName(StringUtils.cleanPath(file.getOriginalFilename()));
        musicFile.setUploader(uploader);
        musicFile.setAudioFile(file.getBytes());
        musicFile.setUploadDate(date);
        musicFileRepository.save(musicFile);
    }
}
