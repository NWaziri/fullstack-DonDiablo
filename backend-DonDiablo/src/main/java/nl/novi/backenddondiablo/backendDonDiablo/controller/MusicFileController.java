package nl.novi.backenddondiablo.backendDonDiablo.controller;

import nl.novi.backenddondiablo.backendDonDiablo.service.MusicFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class MusicFileController {

    @Autowired
    private MusicFileService musicFileService;

    @PostMapping(value = "upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("uploader") String uploader) throws IOException {
        musicFileService.save(file, uploader);
        return new ResponseEntity<Object>("file uploaded", HttpStatus.OK);
    }
}
