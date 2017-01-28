//task variables here.
var style : GUIStyle;
//All the sprites used for target objects
var target1:GameObject; 
var target2:GameObject;
var target3:GameObject;
var target4:GameObject;
var target5:GameObject;
var target6:GameObject;
var target7:GameObject;
var target8:GameObject;
var target9:GameObject;
var target10:GameObject;
var target11:GameObject;
var target12:GameObject;

var tmpObject:GameObject;//this is the shell to change which object is presented on each trial variably in a loop
var tmpString:String;
//Arrays of objects and intervals used
var objectList = new Array("target1","target2","target3");
var objectList_2 = new Array("target4","target5","target6");
var objectList_3 = new Array("target7","target8","target9");

var orderArray_1 = new Array(0,1,2);
var orderArray_2 = new Array(1,2,0);
var orderArray_3 = new Array(2,0,1);
//var orderArray_4 = new Array(3,2,5,1,4,0);
//var orderArray_5 = new Array(4,2,0,5,3,1);
var allOrderArray = new Array(orderArray_1,orderArray_2,orderArray_3);//array used for training
var allOrderArray_2 = new Array(orderArray_3,orderArray_2,orderArray_1);//array used for test trials
var intervalArray = new Array(15,30,60);// array of all possible temporal intervals in seconds
var intervalArray_2 =  new Array(45,75,90);

//below can all be deleted
//Arrays used for presentation of distractor equations
//var equations = new Array("1+1=2","3+5=8","5+8=10","3-2=0","6+7=13","9-3=6","10+3=14","4+5=9","3+8=11","2+2=4","3+3=6","4+4=8","5+5=10","1+9=8","4+3=7","12-4=7","5-2=1","9+9=12","5+8=13","4+7=11");
//var mathInterval_1 = new Array(1,1,1,1,1);   //5+5 = 10
//var mathInterval_2 = new Array(2,3,4,2.5,3.5);//5 + 15    = 20
//var mathInterval_3 = new Array(5,4,6,3,7);  //5+25 = 30
//var mathInterval_4 = new Array(7,3,10,6,9); //5+35  = 40
//var mathInterval_5 = new Array(4,12,8,18,3); //5+45 = 50
//var mathInterval_6 = new Array(8,10,5,20,12);   //5+55 = 60
//var allMathIntervals = new Array(mathInterval_1,mathInterval_2,mathInterval_3,mathInterval_4,mathInterval_5,mathInterval_6);

//this will change as well
var trials:int = 30;// nTrials + 1



var ITI:int = 2; // time (seconds) that object is on the screen during training trials.
public var i:int;
public var responseVar:String;
public var nextTrial:boolean = false;
public var hold:boolean = false;
public var tmpVar:int;
public var j:int;
public var k:int;
public var tmpInterval:int;
//create new object and order lists for pilot training to be 3 block intervals with a test after
   		
function Start(){
//after instructions initiate the movie texture.  This should play the entire time unless instructions
//are on the screen

	GameObject.Find("EndText").GetComponent(MeshRenderer).enabled = false;
	//GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;
	GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;
	GameObject.Find("EncodingInstructions").GetComponent(TextMesh).text = "Hello world";//change this to the encoding instructions
	//GameObject.Find("MathEquations").GetComponent(MeshRenderer).enabled = false;
    System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt","Block" + "," + "Trial" + "," + "ResponseKey" + '\n');
	GameObject.Find("target1").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target2").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target3").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target4").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target5").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target6").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target7").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target8").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target9").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target10").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target11").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("target12").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number3").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number4").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number5").GetComponent(SpriteRenderer).enabled = false;
	GameObject.Find("number6").GetComponent(SpriteRenderer).enabled = false;

	while (!Input.GetKeyDown(KeyCode.Alpha9)) yield;//instruction remain on screen and task will not start until 9 is pressed

	if(Input.GetKeyDown(KeyCode.Alpha9)){
 		GameObject.Find("EncodingInstructions").GetComponent(MeshRenderer).enabled = false;//turns the task instructions off and begins the task
 	}
	// add a few practice trials here

	//loops over 5 blocks
	//loop 

	//set up a training block  train on completely different set to get them familiar with the task  15 v 30 v 60 seconds  then test.  then move on to training for other times   15 v 60 v 75   and  45 v 90 v 120
	//limit the training and then test (determined by pilot testing).  

	//make a separate block for training and then loop over 2 other blocks.

	//change the previous code to run the training trials and the second block to do the actual test trials.

	//need to do test after each block of training with a break in between.

	//separate code block for each item set
	for(block = 0; block < 3; block++){//loops over 3 blocks of 3 trials each
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("BreakText").GetComponent(TextMesh).text = "Start";//change this to the encoding instructions
		yield WaitForSeconds(2);
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;

		for(i  = 0; i < 3; i++){ //determines the object to be presented
   			tmpInterval= intervalArray[allOrderArray[block][i]];//gets the interval to wait on that trial
   			tmpString = objectList[allOrderArray[block][i]];//gets the string of the object name to be presented
   			tmpObject=GameObject.Find(tmpString);//finds the game object
   			tmpObject.transform.position = Vector3(0,0,0);//moves the game object to center
   			yield WaitForSeconds(tmpInterval);//waits for the selected temporal inteval before presenting the object
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = true;
   			yield WaitForSeconds(ITI);
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = false;
   			j=i;
		}
		}

		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;

 		//re-transforms the variable positions
		GameObject.Find("target1").transform.position = Vector3(-1.5,0,0);
		GameObject.Find("target2").transform.position = Vector3(4.99,0,0);
		GameObject.Find("target3").transform.position = Vector3(1.6,0,0);
		GameObject.Find("target4").transform.position = Vector3(8,0,0);
		GameObject.Find("target5").transform.position = Vector3(-5,0,0);
		GameObject.Find("target6").transform.position = Vector3(-8.5,0,0);



		//for test only 2 things need to be presented so this needs to be determined by block and by trial number
		//create a list of vectors that contain the items to be presented
		//this will have to be set up in pseudo random order rather than random selection to make sure that the correct items are 
		//presented on each test trial.

		//should the video also play during the test trials?
		for(var k :int = 0; k < 6; k++){
			System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt",block + "," + k + ",");
			nextTrial = false;
   			tmpInterval = intervalArray[allOrderArray_2[block][k]];//change this to a new pseudo random order
   			Debug.Log("test interval" + tmpInterval);
   			yield WaitForSeconds(tmpInterval);
   			GameObject.Find("target1").GetComponent(SpriteRenderer).enabled = true;
	    	GameObject.Find("target2").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target3").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target4").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target5").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target6").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number3").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number4").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number5").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number6").GetComponent(SpriteRenderer).enabled = true;
			//Debug.Log(k);
			while(nextTrial == false){
				yield;
			}
		}
	}//closes block loop
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
		GameObject.Find("BreakText").GetComponent(TextMesh).text = "Start";//change this to the encoding instructions
		yield WaitForSeconds(2);
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;




		// can get rid of math problems and instead play videos with images appearing over top of video


	//Below is for 1 block with new items
		for(m  = 0; m < 6; m++){ //determines the object to be presented
   			tmpInterval= intervalArray[allOrderArray[1][m]];
   			//Debug.Log("object_" + i);
   			//Debug.Log("interval" + tmpInterval);
   			tmpString = objectList_2[allOrderArray[1][m]];
   			tmpObject=GameObject.Find(tmpString);
   			tmpObject.transform.position = Vector3(0,0,0);
   			//for loop over number of equations to use; number of equations constant across all delays so that can't be a cue
   			for(prob = 0; prob < 5; prob ++){//loops over 5 math problems in each ITI [i] determines the list of intervals based on which object presented
   				var rand2:int = Random.Range(0,20);
   				//GameObject.Find("MathEquations").GetComponent(MeshRenderer).enabled = true;
   				//GameObject.Find("MathEquations").GetComponent(TextMesh).text = equations[rand2];
   				yield WaitForSeconds(1);
   				GameObject.Find("MathEquations").GetComponent(MeshRenderer).enabled = false;
   				//yield WaitForSeconds(allMathIntervals[allOrderArray[1][m]][prob]);
   				//Debug.Log("block_" + block + "item_" + i + "math intervals_" + allMathIntervals[allOrderArray[block][i]][prob]);
   			}
   			GameObject.Find("MathEquations").GetComponent(MeshRenderer).enabled = false;
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = true;
   			yield WaitForSeconds(ITI);
   			GameObject.Find(tmpString).GetComponent(SpriteRenderer).enabled = false;
   			j=i;
		}

		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
 		while (!Input.GetKeyDown(KeyCode.Return)) yield;//breaks until return is pressed, should add instructions
 		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = false;

 		//re-transforms the variable positions
		GameObject.Find("target7").transform.position = Vector3(-5,0,0);
		GameObject.Find("target8").transform.position = Vector3(1.6,0,0);
		GameObject.Find("target9").transform.position = Vector3(8.4,0,0);
		GameObject.Find("target10").transform.position = Vector3(4.99,0,0);
		GameObject.Find("target11").transform.position = Vector3(-8.5,0,0);
		GameObject.Find("target12").transform.position = Vector3(-1.5,0,0);
	       	
		for(var l :int = 0; l < 6; l++){
			//System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt",block + "," + l + ",");
			nextTrial = false;
   			tmpInterval = intervalArray[allOrderArray_2[1][l]];//change this to a new pseudo random order
   			//Debug.Log("test interval" + tmpInterval);
   			yield WaitForSeconds(tmpInterval);
   			GameObject.Find("target7").GetComponent(SpriteRenderer).enabled = true;
	    	GameObject.Find("target8").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target9").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target10").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target11").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("target12").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number3").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number4").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number5").GetComponent(SpriteRenderer).enabled = true;
			GameObject.Find("number6").GetComponent(SpriteRenderer).enabled = true;
			//Debug.Log(k);
			while(nextTrial == false){
				yield;
			}
		}
	//}//closes block loop

	GameObject.Find("EndText").GetComponent(MeshRenderer).enabled = true;

//}//closes start function

function Update(){
	if(j == 29){
   		hold = true;
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = true;
   	}

	if(Input.GetKeyDown(KeyCode.Alpha8)){
		j=j+1;
		GameObject.Find("BreakText").GetComponent(MeshRenderer).enabled = false;
		GameObject.Find("RecallInstructions").GetComponent(MeshRenderer).enabled = true;
	}

	if(Input.GetKeyDown(KeyCode.Alpha1)){
		responseVar = "1";
 	}

 	if(Input.GetKeyDown(KeyCode.Alpha2)){
		responseVar = "2";
 	}

 	if(Input.GetKeyDown(KeyCode.Alpha3)){
		responseVar = "3";
 	}

	if(Input.GetKeyDown(KeyCode.Alpha4)){
		responseVar = "4";
 	}

 	if(Input.GetKeyDown(KeyCode.Alpha5)){
		responseVar = "5";
 	}

 	if(Input.GetKeyDown(KeyCode.Alpha6)){
		responseVar = "6";
 	}

	if(Input.GetKeyDown(KeyCode.Space)){
		System.IO.File.AppendAllText("/Users/bskolarik/Desktop/TemporalPrecisionTask.txt", responseVar + '\n');
		nextTrial = true;
		GameObject.Find("target1").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target2").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target3").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target4").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target5").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target6").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target7").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target8").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target9").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target10").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target11").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("target12").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number1").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number2").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number3").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number4").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number5").GetComponent(SpriteRenderer).enabled = false;
		GameObject.Find("number6").GetComponent(SpriteRenderer).enabled = false;
	}
}