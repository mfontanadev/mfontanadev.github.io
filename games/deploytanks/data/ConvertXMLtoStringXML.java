import java.io.*;

// Convert xml to js varieble maniputalion string.
// Example:
// book.xml is like
//
// <node1>
// 		<title>Dreams androids with electrical sheeps</title>
// </node1>
//
// After execute "ConvertXMLtoStringXML book" you will get a "book.js" like this 
// 
// var bookjs = ""
// bookjs+="<node1>";
// bookjs+="	<title>Dreams androids with electrical sheeps</title>";
// bookjs+="</node1>";

public class ConvertXMLtoStringXML { 
   public static void main(String[] args) { 
        String inputFileName = args[0];
        String outputFileName = args[0] + ".js";

		String varName = args[0]+"js";
        varName = varName.replace(".", "");
		
		String inputText="";
		inputText+="var " + varName + " = '';\n";

        //reading   
		System.out.println("Input file data:");
        try{
            InputStream ips=new FileInputStream(inputFileName); 
            InputStreamReader ipsr=new InputStreamReader(ips);
            BufferedReader br=new BufferedReader(ipsr);
            String line;
			
            while ((line=br.readLine())!=null){
                System.out.println(line);
                inputText+=varName + "+='" + line+ "';\n";
            }
            br.close(); 
        }       
        catch (Exception e){
            System.out.println(e.toString());
        }

        //writing
		System.out.println("Output file data:");
		System.out.println(inputText);
        try {
            FileWriter fw = new FileWriter (outputFileName);
            BufferedWriter bw = new BufferedWriter (fw);
            PrintWriter fileOut = new PrintWriter (bw); 
                fileOut.println (inputText); 
            fileOut.close();
            System.out.println("the file " + outputFileName + " is created!"); 
        }
        catch (Exception e){
            System.out.println(e.toString());
        }       
   }
}