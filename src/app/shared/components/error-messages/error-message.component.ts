import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ErrorMessageComponent {
  @Input() message: string = 'Something went wrong...'
}
