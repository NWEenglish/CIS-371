package edu.gvsu.cis;

import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;

public class WebClient {

    public static void main(String[] args) {
        String hostName = "localhost";
        int portNumber = 8000;

        // Step 1: Create a socket that connects to the above host and port number
        try {
            Socket webSocket = new Socket(hostName, portNumber);
        }
        catch (UnknownHostException e) {
            e.printStackTrace();
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        
        // Step 2: Create a PrintWriter fromet.getInputStream()));
        //         Use the autoFlush option
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(webSocket.getInputStream()));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        // Step 3: Create a BufferedReader from the socket's input stream
        try {
            BufferedReader stdIn = new BufferedReader(new InputStreamReader(System.in));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        // Step 4: Send an HTTP GET request via the PrintWriter.
        //         Remember to print the necessary blank line
        try {
            PrintWriter out = new PrintWriter(webSocket.getOutputStream(), true);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        
        out.println("GET /docs/web/abc.html HTTP/1.0");
        out.println("HOST: www.cis.gvsu.edu");
        out.println("Accept-Language: en-us");
        out.println();
        // out.flush();

        // Step 5a: Read the status line of the response
        // Step 5b: Read the HTTP response via the BufferedReader until
        //         you get a blank line
        String statusLine = stdIn.readLine();
        while ( !statusLine.equals("") ) {
            out.println(statusLine);
            statusLine = stdIn.readLine();
        }

        // Step 6a: Create a FileOutputStream for storing the payload
        // Step 6b: Wrap the FileOutputStream in another PrintWriter
        String payload;
        try {
            FileOutputStream stdOut = new FileOutputStream(payload);
            PrintWriter PWout = new PrintWriter(new OutputStreamWriter(System.out));
        }
        catch (IOException e) {
            e.printStackTrace();
        }

        // Step 7: Read the rest of the input from BufferedReader and write
        //         it to the second PrintWriter.
        //         Hint: readLine() returns null when there is no more data
        //         to read
        statusLine = stdIn.readLine();
        while ( statusLine != null ) {
            PWout.println(statusLine);
            statusLine = stdIn.readLine();
        }

        // Step 8: Remember to close the writer
        in.close();
        stdIn.close();
        out.close();
    }
}