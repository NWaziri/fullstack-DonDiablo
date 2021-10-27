package nl.novi.backenddondiablo.backendDonDiablo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;

@Entity
@Table(name = "music_files")
public class MusicFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fileName;

    @Column
    private String uploader;

    @Column
    private String uploadDate;

    @OneToOne
//    @JsonBackReference
//    @JsonManagedReference
//    @JsonIdentityReference
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    private Comment comment;

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Comment getComment() {
        return comment;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUploader() {
        return uploader;
    }

    public void setUploader(String uploader) {
        this.uploader = uploader;
    }

    public String getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(String uploadDate) {
        this.uploadDate = uploadDate;
    }

    public MusicFile() {

    }

    public MusicFile(String fileName, String uploader, String uploadDate) {
        this.fileName = fileName;
        this.uploader = uploader;
        this.uploadDate = uploadDate;
    }
}
