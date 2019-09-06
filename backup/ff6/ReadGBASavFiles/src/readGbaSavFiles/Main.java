package readGbaSavFiles;

import java.io.IOException;

import javax.swing.UnsupportedLookAndFeelException;

public class Main {
    public static void main(String[] args) {
        // If the user supplies the sav file name in a command line argument
        if (args.length == 1) {
            String fileName = args[0];
            System.out.println("Filename is: " + fileName);
            
            try {
                new ParseSavFile(fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        // Else, invoke the GUI
        else {
            try {
                new MainFrame();
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (UnsupportedLookAndFeelException e) {
                e.printStackTrace();
            }
        }
    }
}
