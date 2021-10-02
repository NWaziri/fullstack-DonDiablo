package nl.novi.backenddondiablo.backendDonDiablo.utils;

import ws.schild.jave.Encoder;
import ws.schild.jave.MultimediaObject;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;

import java.io.File;

public class AudioConvertor {

    private String sourcePath;
    private String outputPath;

    public AudioConvertor(String sourcePath, String outputPath) {
        this.sourcePath = sourcePath;
        this.outputPath = outputPath;
    }

    public AudioAttributes createMP3Attributes() {
        AudioAttributes audio = new AudioAttributes();
        audio.setCodec("libmp3lame");
        audio.setChannels(2);
        audio.setBitRate(320000);
        audio.setSamplingRate(44100);
        return audio;
    }

    public EncodingAttributes createEncodingMP3(AudioAttributes audio) {
        EncodingAttributes encodingMP3 = new EncodingAttributes();
        encodingMP3.setOutputFormat("mp3");
        encodingMP3.setAudioAttributes(audio);

        return encodingMP3;
    }

    public void convertToMP3() {
        File sourceFile = new File(this.sourcePath);
        File outputFile = new File(this.outputPath);

        AudioAttributes MP3Attributes = createMP3Attributes();
        EncodingAttributes encodingMP3 = createEncodingMP3(MP3Attributes);

        try {
            Encoder encoder = new Encoder();
            encoder.encode(new MultimediaObject(sourceFile), outputFile, encodingMP3);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
