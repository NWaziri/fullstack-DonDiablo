package nl.novi.backenddondiablo.backendDonDiablo.controller;


import nl.novi.backenddondiablo.backendDonDiablo.service.EmailSenderService;
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
@RequestMapping(value = "/files")
public class MusicFileController {

    @Autowired
    private MusicFileServiceImplementation musicFileService;

    @Autowired
    private EmailSenderService emailSenderService;


    @GetMapping(value = "/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Object> getFile(@PathVariable String filename) {
        UrlResource file = musicFileService.load(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }


    @GetMapping("/filesinfo/{name}")
    public ResponseEntity<Object> getFilesInfo(@PathVariable("name") String name) {
        return ResponseEntity.ok().body(musicFileService.getFilesInfo(name));
    }

    @PostMapping(value = "/upload")
    public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("uploader") String uploader, @RequestParam("email") String email) throws IOException {
        musicFileService.save(file, uploader);
        emailSenderService.sendEmail(email);
        return new ResponseEntity<Object>("file uploaded", HttpStatus.OK);
    }

}
