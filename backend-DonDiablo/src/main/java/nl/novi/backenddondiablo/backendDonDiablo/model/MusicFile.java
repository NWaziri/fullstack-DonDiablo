package nl.novi.backenddondiablo.backendDonDiablo.model;

import javax.persistence.*;
import java.util.Date;

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
    private Date uploadDate;

    @Column
    @Lob
    private byte[] audioFile;
}
