import cp from "child_process";
import fs from "fs";
import { limitedLoop } from "../src/limitedLoop";

async function processPart(partName: string): Promise<boolean> {
  const env = { ...process.env, PART_NAME: partName };
  const run = (cmd: string) => {
    console.log("=> Running", cmd);
    cp.execSync(cmd, { stdio: "inherit", env });
  };

  if (fs.existsSync(`artifacts/${partName}.gemini_transcript.txt`)){
    console.log(`${partName}.gemini_transcript.txt exists, Skip this part...`)
    return true
  } else {
    if (fs.existsSync(`artifacts/${partName}.mp4`)) {
      run(`export PART_NAME=${partName}`)
      run(`tsx ../../scripts/video_transcribe.ts`);
    } else if (fs.existsSync(`artifacts/${partName}.mp3`)) {
      run(`export PART_NAME=${partName}`)
      run(`tsx ../../scripts/audio_transcribe.ts`);
    } else {
      throw new Error(`No video/audio artifacts found for part ${partName}`);
    }
  }
  return false
}

async function processPart2(partName: string): Promise<boolean> {
  const env = { ...process.env, PART_NAME: partName };
  const run = (cmd: string) => {
    console.log("=> Running", cmd);
    cp.execSync(cmd, { stdio: "inherit", env });
  };
 
  if (fs.existsSync(`artifacts/${partName}.improved_transcript.txt`)){
    console.log(`${partName}.improved_transcript.txt exists, Skip this part...`)
    return true
  } else {
    run(`export PART_NAME=${partName}`)
    run(`tsx ../../scripts/transcript_improve.ts`);
  }
  return false
}

async function processPart3(partName: string): Promise<boolean> {
  const env = { ...process.env, PART_NAME: partName };
  const run = (cmd: string) => {
    console.log("=> Running", cmd);
    cp.execSync(cmd, { stdio: "inherit", env });
  };
 
  if (fs.existsSync(`artifacts/${partName}.alignment.txt`)){
    console.log(`${partName}.alignment.txt exists, Skip this part...`)
    return true
  } else {
    run(`export PART_NAME=${partName}`)
    run(`tsx ../../scripts/align.ts`);
  }
  return false
}

const parts = JSON.parse(fs.readFileSync("artifacts/parts.json", "utf8"));

limitedLoop(parts.length, 2, processPart3);
