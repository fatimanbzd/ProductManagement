import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {ProductService} from "../product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  private _destroy = new Subject<void>();

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      weight: [null],
      description: [null]
    })
  }

  submit(form: any) {
    this.productService.add(form.value)
      .subscribe(res => {
          if (res.isSuccess)
            this.router.navigateByUrl('/product-list')
        }
      )
  }


  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
