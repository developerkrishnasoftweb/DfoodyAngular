import { Injectable, EventEmitter } from '@angular/core';
import { IStepper } from '@shared/components/stepper-work-flow/stepper-work-flow.models';

@Injectable()
export class WorkflowService {
   private workflowSteps: IStepper[] = [] as IStepper[];
   stepClickEmitter = new EventEmitter<string>();
   finalStepEditEmitter = new EventEmitter<string>();
   changesEmitter = new EventEmitter<boolean>();

   /**
    * checks for the first invalid step and return the invalid step
    * If not found will return the last step as invalid.
    * @returns {number}
    * @memberof WorkflowService
    */
   getFirstInvalidStep(): number {
      let redirectToStep = this.workflowSteps.length + 1;
      for (let i = 0; i < this.workflowSteps.length; i++) {
         const item = this.workflowSteps[i];
         if (!item.valid) {
            redirectToStep = i;
            return redirectToStep;
         }
      }
      return redirectToStep;
   }
   /**  return the workflowSteps object {step: string; valid: boolean;
    *   isValueChanged: boolean; }
    *
    * @type {IStepper[]}
    * @memberof WorkflowService
    */
   get workflow(): IStepper[] {
      return this.workflowSteps;
   }
   /**
    * set the workflowSteps object{step: string; valid: boolean;
    * isValueChanged: boolean; }
    * @memberof WorkflowService
    */
   set workflow(stepperWorkflow: IStepper[]) {
      this.workflowSteps = stepperWorkflow;
   }
   /**
    * to check if a specific step is valid or not
    *
    * @memberof WorkflowService
    */
   isStepValid(stepValue: number): boolean {
      return this.workflowSteps[stepValue].valid;
   }

   /**
    * Returns workflow steps
    *
    * @returns
    * @memberof WorkflowService
    */
   getWorkflow() {
      return this.workflowSteps;
   }

   /**
    * Sets stepper workflow steps
    *
    * @param {IStepper[]} stepperWorkflow
    * @memberof WorkflowService
    */
   setWorkflow(stepperWorkflow: IStepper[]) {
      this.workflowSteps = stepperWorkflow;
   }

   /**
    * Validates if step visited previosuly or not
    *
    * @param {number} stepValue
    * @returns {boolean}
    * @memberof WorkflowService
    */
   isStepVisited(stepValue: number): boolean {
      return this.workflowSteps[stepValue].isVisited;
   }
}
