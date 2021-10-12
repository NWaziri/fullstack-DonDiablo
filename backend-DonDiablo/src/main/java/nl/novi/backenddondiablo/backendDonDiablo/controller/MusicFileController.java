package nl.novi.backenddondiablo.backendDonDiablo.controller;

//import nl.novi.backenddondiablo.backendDonDiablo.service.MusicFileService;
import nl.novi.backenddondiablo.backendDonDiablo.model.Comment;
import nl.novi.backenddondiablo.backendDonDiablo.model.MusicFile;
import nl.novi.backenddondiablo.backendDonDiablo.repository.CommentRepository;
import nl.novi.backenddondiablo.backendDonDiablo.service.CommentService;
import nl.novi.backenddondiablo.backendDonDiablo.service.MusicFileServiceImplementation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class MusicFileController {

    @Autowired
    private MusicFileServiceImplementation musicFileService;

    @Autowired
    private CommentRepository commentRepository;

//    @Autowired
//    private CommentService commentService;

    @GetMapping(value = "/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Object> getFile(@PathVariable String filename) {
        UrlResource file = musicFileService.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("uploader") String uploader) throws IOException {
//        MusicFile musicFile = new MusicFile();
//        commentRepository.save(comment);
        musicFileService.save(file, uploader);
        return new ResponseEntity<Object>("file uploaded", HttpStatus.OK);
    }
}
