<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="昵称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleAdd">添加</el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->
      <el-table-column label="管理员id" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.admin_id }}
        </template>
      </el-table-column>
      <el-table-column label="昵称">
        <template slot-scope="scope">
          {{ scope.row.nick_name }}
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.true_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="180" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <div>
  <el-dialog :title="form && form.id ? '编辑' : '添加' " :visible.sync="formVisible" :close-on-click-modal="false">
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="管理员id" prop="admin_id">
        <el-input v-model="form.admin_id" />
      </el-form-item>
            <el-form-item label="昵称" prop="nick_name">
        <el-input v-model="form.nick_name" />
      </el-form-item>
                  <el-form-item label="真实姓名" prop="true_name">
        <el-input v-model="form.true_name" />
      </el-form-item>
                  <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
                  <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <!-- <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="formVisible = false">取消</el-button>
      <el-button type="primary" @click.native="addData" :loading="formLoading">提交</el-button>
    </div>
  </el-dialog>
  </div>
  </div>
</template>

<script>
import { listAdmin } from '@/axios/api'
import { addAdmin } from '@/axios/api'
import { deleteAdmin } from '@/axios/api'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true ,
      form : {},
      size : 20,
      filters : {},
      formLoading: false,
      formVisible: false,
      total : 0,
      page : 1,
      rows : {},
      clientHeight : '100%',
      rules : {
        nick_name: [{
        required: true,
        message: '请输入昵称',
        trigger: 'blur'
      }],
  // sex: [{
  //   required: true,
  //   message: '请选择性别',
  //   trigger: 'change'
  // }]
},
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      listAdmin(this.listQuery).then(response => {
        this.list = response.data.rows
        console.log('')
        console.log(this.list)
        this.listLoading = false
      })
    },
    addData() {
      this.formLoading = true
      addAdmin(this.form).then(response => {
        this.formLoading = false
        if (!response.data.success) {
          
          this.$message({
            showClose: true,
            message: response.data.message,
            type: 'error'
          })
          return
        }
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        // this.page = 1
        this.fetchData()
        this.formVisible = false
      })
    },
    handleAdd() {
      console.log("1111111")
  this.form = {}
  // this.form.sex = 1
  this.formVisible = true      
    },
    handleDownload() {
      
    },
    handleFilter() {

    },
    downloadLoading() {
      
    },
    handleDelete(index,row){
      this.$confirm('此操作将永久删除数据，是否继续？','提示', {
        confirmButtonText: '确定',
        canceButtonText: '取消',
        type : 'warning'

      }).then(() => {
        // console.log('delete在这')
        this.listLoading = true
        deleteAdmin(row.admin_id).then(res =>{
          // console.log('delete在这2')
          this.listLoading = false
          if(!res.data.success){
            this.$message({
              type : 'error',
              message : res.data.message
            })
            return
          }
          this.$message({
            type : 'success',
            message : row.nick_name+'   删除成功！'
          })
          // this.page = 1
          this.fetchData()
        })
        
      })

    },
    handleEdit(index,row){
      this.form = Object.assign({},row)
      this.formVisible = true
    }
  }
}
</script>

<style scoped>
  .filter-container {
    margin-bottom: 20px
  }
</style>
