package nl.novi.backenddondiablo.backendDonDiablo.service;

import helpers.CurrentDate;
import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import nl.novi.backenddondiablo.backendDonDiablo.repository.MusicFileRepository;
import nl.novi.backenddondiablo.backendDonDiablo.utils.AudioConvertor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.sound.sampled.AudioFormat;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class MusicFileServiceImplementation implements MusicFileService {

    private Path root = Paths.get("uploads");
    private Path converted = Paths.get("converted");

    @Autowired
    private MusicFileRepository musicFileRepository;

    @Override
    public void init() {
        try {
            Files.createDirectory(root);
            Files.createDirectory(converted);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize root folder for upload");
        }
    }

    @Override
    public void save(MultipartFile file, String uploader) throws IOException {
        CurrentDate currentDate = new CurrentDate();
        String date = currentDate.generateDate();

        try {
            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
            Path source = Paths.get(System.getProperty("user.dir") + "/uploads" + "/" + file.getOriginalFilename());
            String fileName = file.getOriginalFilename().substring(0, file.getOriginalFilename().lastIndexOf("."));
            Path target = Paths.get(System.getProperty("user.dir") + "/converted" + "/" + fileName + ".mp3");
            System.out.println("source: " + source);
            System.out.println("target: " + target);
            AudioConvertor audioConvertor = new AudioConvertor(source.toString(), target.toString());
            audioConvertor.convertToMP3();


            MusicFile musicFile = new MusicFile();
            musicFile.setFileName(fileName + ".mp3");
            musicFile.setUploader(uploader);
            musicFile.setUploadDate(date);

            musicFileRepository.save(musicFile);

            System.out.println("input stream: " + file.getInputStream());
            System.out.println("path: " + this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public UrlResource load(String filename) {
        try {
            Path file = converted.resolve(filename);
            UrlResource resource = new UrlResource(file.toUri());
            System.out.println("resource: " + resource);
            System.out.println("file to url: " + file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " );
        }
    }


    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }
}
