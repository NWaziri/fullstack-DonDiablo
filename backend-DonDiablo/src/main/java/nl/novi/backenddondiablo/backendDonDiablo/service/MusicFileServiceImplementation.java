package nl.novi.backenddondiablo.backendDonDiablo.service;

import helpers.CurrentDate;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import nl.novi.backenddondiablo.backendDonDiablo.model.User;
import nl.novi.backenddondiablo.backendDonDiablo.repository.CommentRepository;
import nl.novi.backenddondiablo.backendDonDiablo.repository.MusicFileRepository;
import nl.novi.backenddondiablo.backendDonDiablo.utils.AudioConvertor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

//implements MusicFileService
@Service
public class MusicFileServiceImplementation  {

    private Path root = Paths.get("uploads");
    private Path converted = Paths.get("converted");

    @Autowired
    private MusicFileRepository musicFileRepository;

    @Autowired
    private CommentRepository commentRepository;

//    @Override
    public void init() {
        try {
            Files.createDirectory(root);
            Files.createDirectory(converted);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize root folder for upload");
        }
    }

//    @Override
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

            Comment comment = new Comment("We zijn bezig met het beoordelen van de demo, binnen 24 uur ontvangt u commentaar");

//            comment.setMusicFile(musicFile)

            MusicFile musicFile = new MusicFile();
            musicFile.setFileName(fileName + ".mp3");
            musicFile.setUploader(uploader);
            musicFile.setUploadDate(date);
            musicFile.setComment(comment);
//            comment.setMusicFile(musicFile);
            commentRepository.save(comment);

            musicFileRepository.save(musicFile);

            System.out.println("input stream: " + file.getInputStream());
            System.out.println("path: " + this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

//    @Override
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

    public MusicFile getMusicFile(String name) {
        return musicFileRepository.getMusicFileByUploader(name);
    }

    public Iterable<MusicFile> getFilesInfo(String name) {
        return musicFileRepository.getMusicFilesByUploader(name);
    }

//    @Override
//    public void deleteAll() {
//        FileSystemUtils.deleteRecursively(root.toFile());
//    }
}
