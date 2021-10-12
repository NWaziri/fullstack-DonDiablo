package nl.novi.backenddondiablo.backendDonDiablo.model;

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
    @JoinColumn(name = "comment_id", referencedColumnName = "id")
    private Comment comment;

    public void setComment(Comment comment) {
        this.comment = comment;
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
