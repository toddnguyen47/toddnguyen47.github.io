package readGbaSavFiles;

import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.File;
import java.io.IOException;

import javax.swing.Action;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPopupMenu;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.KeyStroke;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.filechooser.FileNameExtensionFilter;
import javax.swing.text.DefaultEditorKit;

public class MainFrame extends JFrame {
    // ************************************************************************
    // Initialize Frame Components
    // ---------------------------
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    private JFileChooser fileChooser;
    private JButton fileChooserButton;
    private JLabel fileChooserLabel;
    private JTextArea outputTextArea;
    private JLabel chosenFileName;
    
    private boolean firstTimeFileBrowsed;
    private File prevPath;
    private File selectedFile;
    
    // ------------------------------------
    // End of Initializing Frame Components
    // ************************************************************************
    
    
    public MainFrame() throws ClassNotFoundException, InstantiationException, IllegalAccessException, UnsupportedLookAndFeelException {
        this.init();
        this.setVisible(true);
    }
    
    
    /**
     * Initialize all the components of this frame
     * @throws UnsupportedLookAndFeelException 
     * @throws IllegalAccessException 
     * @throws InstantiationException 
     * @throws ClassNotFoundException 
     */
    private void init() throws ClassNotFoundException, InstantiationException, IllegalAccessException, UnsupportedLookAndFeelException {
        this.setPreferredSize(new Dimension(640, 480));
        this.setDefaultCloseOperation(EXIT_ON_CLOSE);
        this.setLayout(new GridBagLayout());
        this.setTitle("Get Gau's Rages Hexadecimal Numbers");
        UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        firstTimeFileBrowsed = true;
        
        // Common GridBagConstraints used by all components when adding to the frame
        // This is just for convenience purposes
        GridBagConstraints gridBagConstraints;
        
        // Add the fileChooserLabel
        fileChooserLabel = new JLabel();
        fileChooserLabel.setText("Choose a .sav file");
        gridBagConstraints = getBaseGridbagConstraints(0, 0);
        gridBagConstraints.anchor = GridBagConstraints.LINE_END;
        gridBagConstraints.weightx = 0.5;
        gridBagConstraints.weighty = 0.25;
        this.getContentPane().add(fileChooserLabel, gridBagConstraints);
        
        // Add the button that enables the fileChooser browsing
        fileChooser = new JFileChooser();
        this.fileChooser.setFileFilter(new FileNameExtensionFilter(".sav", "sav"));
        fileChooserButton = new JButton();
        fileChooserButton.setText("Browse");
        fileChooserButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent evt) {
                // Call this file's fileChooserButtonActionPerformed function
                fileChooserButtonActionPerformed(evt);   
            }
        });
        gridBagConstraints = getBaseGridbagConstraints(1, 0);
        gridBagConstraints.anchor = GridBagConstraints.LINE_START;
        gridBagConstraints.weightx = 0.5;
        gridBagConstraints.weighty = 0.25;
        this.getContentPane().add(fileChooserButton, gridBagConstraints);
        
        // If the user selected a file, display it here
        chosenFileName = new JLabel();
        gridBagConstraints = this.getBaseGridbagConstraints(0, 1);
        gridBagConstraints.gridwidth = 2;
        this.getContentPane().add(chosenFileName, gridBagConstraints);
        
        // Add the text area output
        outputTextArea = new JTextArea();
        outputTextArea.setLineWrap(true);
        outputTextArea.setEditable(false);
        outputTextArea.setComponentPopupMenu(this.getMenu());
        outputTextArea.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
        JScrollPane pane = new JScrollPane(outputTextArea);
        gridBagConstraints = getBaseGridbagConstraints(0, 2);
        gridBagConstraints.fill = GridBagConstraints.BOTH;
        gridBagConstraints.gridwidth = 2;
        gridBagConstraints.weighty = 0.75;
        this.getContentPane().add(pane, gridBagConstraints);
        
        
        
        // ********************************************************************
        // Do NOT Delete the lines below!
        this.pack();
        // Center the screen
        this.setLocationRelativeTo(null);
    }
    
    
    /**
     * Obtain the base gridbag constraints.
     * @param gridx - where this content should be placed
     * @param gridy - where this content should be placed
     * @return
     */
    private GridBagConstraints getBaseGridbagConstraints(int gridx, int gridy) {
        GridBagConstraints gridBagConstraints = new GridBagConstraints();
        int inset = 5;
        gridBagConstraints.insets = new Insets(inset, inset, inset, inset);
        
        gridBagConstraints.gridx = gridx;
        gridBagConstraints.gridy = gridy;
        return gridBagConstraints;
    }
    
    
    /**
     * Action event to perform what the FileChooser button does
     * @param evt
     */
    private void fileChooserButtonActionPerformed(ActionEvent evt) {
        if (firstTimeFileBrowsed) {
            // Set the file chooser to the current directory
            File currentDirectory = new File(System.getProperty("user.dir"));
            fileChooser.setCurrentDirectory(currentDirectory);
            firstTimeFileBrowsed = false;
        }
        else {
            // Set the file chooser to last chosen directory
            fileChooser.setCurrentDirectory(this.prevPath);
        }

        // Open the file chooser
        int returnVal = fileChooser.showOpenDialog(this);
        this.prevPath = fileChooser.getSelectedFile();
        
        // If the user selects "OK"
        if (returnVal == JFileChooser.APPROVE_OPTION) {
            // Check if the file ends with ".sav"
            File selectedFile = fileChooser.getSelectedFile();
            // If the file does not end with sav
            if (selectedFile.getName().endsWith(".sav") == false) {
                JOptionPane.showMessageDialog(this, "Please select a .sav file");
            }
            else {
                // Set this class's file to the selected file
                this.selectedFile = fileChooser.getSelectedFile();
                this.chosenFileName.setText(this.selectedFile.getName());
                this.readFileContents();
            }
        }
        else {
            System.out.println("File access cancelled by user.");
        }
    }
    
    
    /**
     * Read the binary .sav file and input Gau's rages in hex form in the text area
     */
    public void readFileContents() {
        try {
            ParseSavFile parseSavFile = new ParseSavFile(this.selectedFile.getAbsolutePath());
            String result = parseSavFile.readGauRagesHex();
            
            this.outputTextArea.setText(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    
    /**
     * Create a popup menu right copy pasting when right clicking.
     * @return
     */
    private JPopupMenu getMenu() {
        JPopupMenu menu = new JPopupMenu();
        Action cut = new DefaultEditorKit.CutAction();
        cut.putValue(Action.NAME, "Cut");
        cut.putValue(Action.ACCELERATOR_KEY, KeyStroke.getKeyStroke("control X"));
        menu.add( cut );

        Action copy = new DefaultEditorKit.CopyAction();
        copy.putValue(Action.NAME, "Copy");
        copy.putValue(Action.ACCELERATOR_KEY, KeyStroke.getKeyStroke("control C"));
        menu.add( copy );

        Action paste = new DefaultEditorKit.PasteAction();
        paste.putValue(Action.NAME, "Paste");
        paste.putValue(Action.ACCELERATOR_KEY, KeyStroke.getKeyStroke("control V"));
        menu.add( paste );
        
        return menu;
    }
}
