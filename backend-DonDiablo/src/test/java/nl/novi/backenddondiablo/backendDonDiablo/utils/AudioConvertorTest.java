package nl.novi.backenddondiablo.backendDonDiablo.utils;

import org.junit.jupiter.api.Test;
import ws.schild.jave.encode.AudioAttributes;
import ws.schild.jave.encode.EncodingAttributes;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class AudioConvertorTest {

    @Test
    void createMP3Attributes() {

        AudioAttributes audioAttributes = new AudioAttributes();

        //act
        audioAttributes.setCodec("libmp3lame");
        audioAttributes.setChannels(2);
        audioAttributes.setBitRate(320000);
        audioAttributes.setSamplingRate(44100);

        //assert
        String expectedCodec = "libmp3lame";
        int expectedChannels = 2;
        int expectedBitRate = 320000;
        int expectedSamplingRate = 44100;

        String actualCodec = audioAttributes.getCodec().orElseThrow();
        int actualChannels = audioAttributes.getChannels().orElseThrow();
        int actualBitRate = audioAttributes.getBitRate().orElseThrow();
        int actualSamplingRate = audioAttributes.getSamplingRate().orElseThrow();

        assertEquals(expectedCodec, actualCodec);
        assertEquals(expectedChannels, actualChannels);
        assertEquals(expectedBitRate, actualBitRate);
        assertEquals(expectedSamplingRate, actualSamplingRate);

    }
}