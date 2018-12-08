package readGbaSavFiles;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ParseSavFile {
    private byte[] byteArray;
    private final static char[] hexArray = "0123456789ABCDEF".toCharArray();
    private final static int NUM_RAGE_GROUPS = 32;
    private final static String OFFSET = "72C";
    
    
    public ParseSavFile(String fileName) throws IOException {
        Path p = Paths.get(fileName);
        this.byteArray = Files.readAllBytes(p);
    }
    
    
    /**
     * Read Gau's rages and return it in a hex string.
     * @return Gau's rages in a hex string
     */
    public String readGauRagesHex() {
        StringBuilder sb = new StringBuilder();
        int offsetInInt = Integer.parseInt(ParseSavFile.OFFSET, 16);
        int maxOffset = offsetInInt + ParseSavFile.NUM_RAGE_GROUPS;
        
        for (int i = offsetInInt; i < maxOffset; i++) {
            int curData = this.byteArray[i] & 0xFF;
            String s = String.format("%02X", curData);
            sb.append(s);
        }
        
        return sb.toString();
    }
    
    
    public static String convertBytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int i = 0; i < bytes.length; i++) {
            // If you logical AND with 1111 1111 (0xFF), we will obtain the int representation
            // of the current number
            int temp = bytes[i] & 0xFF;
            
            // Get the hex representation of the first 4 bits by unsigned right shift 4 times
            hexChars[i * 2] = hexArray[temp >>> 4];
            // Get the hex rep. of the last 4 bits by logical AND with 0x0F (0000 1111)
            hexChars[i * 2 + 1] = hexArray[temp & 0x0F];
        }
        return new String(hexChars);
    }
}
